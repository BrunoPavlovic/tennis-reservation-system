import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
  MDBBadge
} from "mdb-react-ui-kit";
import { useReservation } from "../hooks/useReservation";
import { useCredit } from "../hooks/useCredit";
import { DaySchedule, CreateReservationDto, TimeSlot } from "../types/Reservation";

const Reservation: React.FC = () => {
  const {
    courts,
    selectedCourt,
    setSelectedCourt,
    clubName,
    creditCost,
    isLoading,
    createReservation,
    generateWeekSchedule,
    initializeReservation
  } = useReservation();

  const { credit, refreshCredit } = useCredit();

  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    startTime: string;
    endTime: string;
    dayName: string;
  } | null>(null);
  const [isCreatingReservation, setIsCreatingReservation] = useState<boolean>(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    initializeReservation(localStorage.getItem('userClub') || '');
  }, []);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load schedule when court or date changes
  useEffect(() => {
    if (selectedCourt && clubName) {
      loadSchedule();
    }
  }, [selectedCourt, currentDate, clubName]);

  const loadSchedule = async () => {
    if (!selectedCourt || !clubName) return;

    setIsScheduleLoading(true);
    setError('');
    try {
      const schedule = await generateWeekSchedule(currentDate, clubName, selectedCourt);
      setWeekSchedule(schedule);
    } catch (error) {
      console.error('Error loading schedule:', error);
      setError('Failed to load schedule. Please try again.');
    } finally {
      setIsScheduleLoading(false);
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);

    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
      
      // Check if the end of the week (6 days after start) is still in the future
      const weekEndDate = new Date(newDate);
      weekEndDate.setDate(newDate.getDate() + 6);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      weekEndDate.setHours(0, 0, 0, 0);
      
      if (weekEndDate < today) return;
    } else {
      newDate.setDate(newDate.getDate() + 7);
      const today = new Date();
      const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28);

      if (newDate > maxDate) return;
    }

    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);

    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newDateStart = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      newDateStart.setHours(0, 0, 0, 0);

      if (newDateStart < today) return;
    } else {
      newDate.setDate(newDate.getDate() + 1);
      const today = new Date();
      const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28);

      if (newDate > maxDate) return;
    }

    setCurrentDate(newDate);
  };

  const handleSlotClick = (slot: TimeSlot, date: string, dayName: string) => {
    if (slot.isOccupied) return;

    setSelectedSlot({
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      dayName
    });
    setShowConfirmation(true);
  };

  const handleConfirmReservation = async () => {
    if (!selectedSlot || !selectedCourt || !clubName) return;

    setIsCreatingReservation(true);
    setError('');
    try {
      const reservationData: CreateReservationDto = {
        date: selectedSlot.date,
        club: clubName,
        court: selectedCourt,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      };

      const success = await createReservation(reservationData, credit);
      if (success) {
        await loadSchedule();

        const newCreditAmount = credit - creditCost;
        (window as any).updateUserCredit?.(newCreditAmount);
        await (window as any).refreshUserCredit?.();
        setShowConfirmation(false);
        setSelectedSlot(null);
      } else {
        setError('Failed to create reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setError('Failed to create reservation. Please try again.');
    } finally {
      setIsCreatingReservation(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentWeekRange = () => {
    const startDate = new Date(currentDate);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  const renderTimeSlot = (slot: TimeSlot, date: string, dayName: string) => {
    const slotDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    slotDate.setHours(0, 0, 0, 0);

    const isPastDate = slotDate < today;
    const isPastTime = slotDate.getTime() === today.getTime() &&
      new Date().getTime() > new Date(`${date}T${slot.startTime}`).getTime();
    const isDisabled = isPastDate || isPastTime;

    return (
      <div
        key={`${date}-${slot.startTime}`}
        className={`time-slot p-2 text-center border rounded mb-1 ${isDisabled
            ? 'bg-secondary text-white cursor-not-allowed'
            : slot.isOccupied
              ? 'bg-danger text-white cursor-not-allowed'
              : 'bg-success text-white hover-bg-success-dark cursor-pointer'
          }`}
        style={{
          minHeight: '40px',
          opacity: isDisabled ? 0.5 : slot.isOccupied ? 0.7 : 1
        }}
        onClick={() => !isDisabled && !slot.isOccupied && handleSlotClick(slot, date, dayName)}
      >
        <small>
          {slot.startTime} - {slot.endTime}
        </small>
        {slot.isOccupied && (
          <div className="mt-1">
            <MDBBadge color="light" className="text-dark">
              <small>{slot.reservation?.userFirstName} {slot.reservation?.userLastName}</small>
            </MDBBadge>
          </div>
        )}
        {isDisabled && !slot.isOccupied && (
          <div className="mt-1">
            <MDBBadge color="dark" className="text-white">
              <small>Past</small>
            </MDBBadge>
          </div>
        )}
      </div>
    );
  };

  const renderWeeklyView = () => (
    <div className="weekly-view">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <MDBBtn
          color="primary"
          outline
          size="sm"
          onClick={() => navigateWeek('prev')}
          disabled={isScheduleLoading}
        >
          <MDBIcon fas icon="chevron-left" />
        </MDBBtn>
        <h5 className="mb-0">
          {getCurrentWeekRange().start} - {getCurrentWeekRange().end}
        </h5>
        <MDBBtn
          color="primary"
          outline
          size="sm"
          onClick={() => navigateWeek('next')}
          disabled={isScheduleLoading}
        >
          <MDBIcon fas icon="chevron-right" />
        </MDBBtn>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: '120px' }}>Time</th>
              {weekSchedule.map((day) => (
                <th key={day.date} className="text-center">
                  <div>{day.dayName}</div>
                  <small className="text-muted">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekSchedule.length > 0 && weekSchedule[0].timeSlots.map((_, timeIndex) => (
              <tr key={timeIndex}>
                <td className="text-center align-middle">
                  <small className="text-muted">
                    {weekSchedule[0].timeSlots[timeIndex].startTime}
                  </small>
                </td>
                {weekSchedule.map((day) => (
                  <td key={day.date} className="p-1">
                    {renderTimeSlot(day.timeSlots[timeIndex], day.date, day.dayName)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDailyView = () => {
    const currentDay = weekSchedule.find(day =>
      new Date(day.date).toDateString() === currentDate.toDateString()
    );

    if (!currentDay) return null;

    return (
      <div className="daily-view">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <MDBBtn
            color="primary"
            outline
            size="sm"
            onClick={() => navigateDay('prev')}
            disabled={isScheduleLoading}
          >
            <MDBIcon fas icon="chevron-left" />
          </MDBBtn>
          <h5 className="mb-0">
            {currentDay.dayName}, {new Date(currentDay.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h5>
          <MDBBtn
            color="primary"
            outline
            size="sm"
            onClick={() => navigateDay('next')}
            disabled={isScheduleLoading}
          >
            <MDBIcon fas icon="chevron-right" />
          </MDBBtn>
        </div>

        <div className="row">
          {currentDay.timeSlots.map((slot, index) => (
            <div key={index} className="col-12 col-md-4 col-lg-3 mb-2">
              {renderTimeSlot(slot, currentDay.date, currentDay.dayName)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <MDBContainer fluid className="py-4">
      <MDBRow>
        <MDBCol>
          <MDBCard className="shadow-5" style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              {/* Header */}
              <div className="mb-4">
                <MDBCardTitle className="h4 mb-1">{clubName}</MDBCardTitle>
                <p className="text-muted mb-0">30 minutes = {creditCost} €</p>
              </div>

              {/* Court Selection */}
              <div className="mb-4">
                <label className="form-label">Select Court:</label>
                <select
                  className="form-select"
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  disabled={isLoading}
                >
                  {courts.length === 0 ? (
                    <option value="">No courts available</option>
                  ) : (
                    courts.map((court, index) => (
                      <option key={index} value={court.name}>
                        {court.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Date Picker */}
              <div className="mb-4">
                <label className="form-label">Select Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={currentDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (selectedDate >= today) {
                      setCurrentDate(selectedDate);
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                <small className="text-muted">
                  You can select any date from today up to 4 weeks in the future
                </small>
              </div>

              {/* Error Display */}
              {error && (
                <div className="alert alert-danger mb-3">
                  <MDBIcon fas icon="exclamation-triangle" className="me-2" />
                  {error}
                </div>
              )}

              {/* Loading Spinner */}
              {isScheduleLoading && (
                <div className="text-center py-5">
                  <MDBSpinner color="primary" />
                  <p className="mt-2">Loading schedule...</p>
                </div>
              )}

              {/* Schedule View */}
              {!isScheduleLoading && (
                <div>
                  {isMobile ? renderDailyView() : renderWeeklyView()}
                </div>
              )}

              {/* Floating Reservation Confirmation */}
              {showConfirmation && selectedSlot && (
                <div className="reservation-confirmation-overlay">
                  <div className="reservation-confirmation-card">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Confirm Your Reservation</h5>
                      <MDBBtn
                        color="link"
                        className="text-muted p-0"
                        onClick={() => setShowConfirmation(false)}
                      >
                        <MDBIcon fas icon="times" size="lg" />
                      </MDBBtn>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Court:</strong> {selectedCourt}</p>
                        <p><strong>Date:</strong> {selectedSlot.dayName}, {new Date(selectedSlot.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                        <p><strong>Cost:</strong> {creditCost} €</p>
                      </div>
                      <div className="col-md-6">
                        {credit < creditCost ? (
                          <div className="alert alert-warning">
                            <MDBIcon fas icon="exclamation-triangle" className="me-2" />
                            Insufficient credit. Please add more credit to make this reservation.
                          </div>
                        ) : (
                          <div className="alert alert-info">
                            <MDBIcon fas icon="info-circle" className="me-2" />
                            Your current credit: {credit.toFixed(2)} €
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <MDBBtn color="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancel
                      </MDBBtn>
                      <MDBBtn
                        color="primary"
                        onClick={handleConfirmReservation}
                        disabled={isCreatingReservation || (credit < creditCost)}
                      >
                        {isCreatingReservation ? (
                          <>
                            <MDBSpinner size="sm" className="me-2" />
                            Creating...
                          </>
                        ) : (
                          'Confirm Reservation'
                        )}
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Reservation;
