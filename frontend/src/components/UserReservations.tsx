import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBSpinner,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";
import api from "../services/axios";
import { UserReservationOverview } from "../types/Reservation";

interface PaginatedResponse {
  content: UserReservationOverview[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const UserReservations: React.FC = () => {
  const [reservations, setReservations] = useState<UserReservationOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<UserReservationOverview | null>(null);
  const [canceling, setCanceling] = useState(false);

  const fetchUserReservations = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/reservations/user?page=${page}`);
      const data: PaginatedResponse = response.data;
      
      setReservations(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      console.error("Failed to load user reservations:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReservations(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancelClick = (reservation: UserReservationOverview) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;

    try {
      setCanceling(true);
      await api.delete(`/reservations/${selectedReservation.reservationId}`);
      
      // Refresh the reservations list
      await fetchUserReservations(currentPage);
      
      setShowCancelModal(false);
      setSelectedReservation(null);
    } catch (error: any) {
      console.error('Error canceling reservation:', error);
      alert(error.response?.data || 'Failed to cancel reservation');
    } finally {
      setCanceling(false);
    }
  };

  const isWithinCancellationWindow = (dateString: string, timeString: string): boolean => {
    const reservationDate = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const hoursDifference = (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDifference >= 24;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <MDBSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px" }}>
        <MDBCardBody className="p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <MDBCardTitle className="fw-bold h4 mb-0">
              <MDBIcon fas icon="calendar-alt" className="me-2 text-primary" />
              My Reservations
            </MDBCardTitle>
            {totalElements > 0 && (
              <span className="text-muted">
                {totalElements} reservation{totalElements !== 1 ? 's' : ''} total
              </span>
            )}
          </div>

          {reservations.length === 0 ? (
            <div className="text-center py-5">
              <MDBIcon fas icon="calendar-times" size="3x" className="text-muted mb-3" />
              <h5 className="text-muted">No reservations found</h5>
              <p className="text-muted mb-0">You haven't made any reservations yet.</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <MDBTable hover responsive className="mb-0">
                  <MDBTableHead className="table-dark">
                    <tr>
                      <th scope="col" className="d-none d-md-table-cell">Club & Court</th>
                      <th scope="col">Date</th>
                      <th scope="col" className="d-none d-sm-table-cell">Time</th>
                      <th scope="col" className="text-center">Credit Cost</th>
                      <th scope="col" className="text-center">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {reservations.map((reservation, index) => (
                      <tr key={index} className="align-middle">
                        <td className="d-none d-md-table-cell">
                          <div>
                            <div className="fw-bold text-primary">{reservation.clubName}</div>
                            <div className="text-muted small">{reservation.courtName}</div>
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold">{formatDate(reservation.date)}</div>
                          <div className="d-md-none text-muted small">
                            {reservation.clubName} - {reservation.courtName}
                          </div>
                        </td>
                        <td className="d-none d-sm-table-cell">
                          <div>
                            <div className="fw-bold">{formatTime(reservation.startTime)}</div>
                            <div className="text-muted small">to {formatTime(reservation.endTime)}</div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div>
                            <span className="badge bg-success fs-6 d-none d-sm-inline">
                              {reservation.creditCost}€
                            </span>
                            <span className="badge bg-success d-sm-none">
                              {reservation.creditCost}€
                            </span>
                          </div>
                          <div className="d-sm-none text-muted small mt-1">
                            {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                          </div>
                        </td>
                        <td className="text-center">
                          <MDBBtn floating
                            color="danger"
                            size="sm"
                            onClick={() => handleCancelClick(reservation)}
                            disabled={!isWithinCancellationWindow(reservation.date, reservation.startTime)}
                            title={!isWithinCancellationWindow(reservation.date, reservation.startTime) 
                              ? "Reservations can only be cancelled up to 24 hours in advance" 
                              : "Cancel reservation"}
                          >
                            <MDBIcon fas icon="times" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <MDBPagination className="mb-0">
                    <MDBPaginationItem disabled={currentPage === 0}>
                      <MDBPaginationLink 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 0 ? 'disabled' : ''}
                      >
                        <MDBIcon fas icon="chevron-left" />
                      </MDBPaginationLink>
                    </MDBPaginationItem>

                    {(() => {
                      const maxVisiblePages = 5;
                      let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
                      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
                      
                      if (endPage - startPage + 1 < maxVisiblePages) {
                        startPage = Math.max(0, endPage - maxVisiblePages + 1);
                      }
                      
                      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                        <MDBPaginationItem key={page} active={page === currentPage}>
                          <MDBPaginationLink 
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? 'active' : ''}
                          >
                            {page + 1}
                          </MDBPaginationLink>
                        </MDBPaginationItem>
                      ));
                    })()}

                    <MDBPaginationItem disabled={currentPage === totalPages - 1}>
                      <MDBPaginationLink 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages - 1 ? 'disabled' : ''}
                      >
                        <MDBIcon fas icon="chevron-right" />
                      </MDBPaginationLink>
                    </MDBPaginationItem>
                  </MDBPagination>
                </div>
              )}
            </>
          )}
        </MDBCardBody>
      </MDBCard>

      {/* Cancel Confirmation Overlay */}
      {showCancelModal && selectedReservation && (
        <div className="reservation-confirmation-overlay">
          <MDBCard className="reservation-confirmation-card">
            <MDBCardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Cancel Reservation</h5>
                <MDBBtn
                  color="link"
                  className="text-muted p-0"
                  onClick={() => setShowCancelModal(false)}
                >
                  <MDBIcon fas icon="times" size="lg" />
                </MDBBtn>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>Are you sure you want to cancel this reservation?</p>
                  <div className="alert alert-info">
                    <strong>Reservation Details:</strong><br />
                    <strong>Club:</strong> {selectedReservation.clubName}<br />
                    <strong>Court:</strong> {selectedReservation.courtName}<br />
                    <strong>Date:</strong> {formatDate(selectedReservation.date)}<br />
                    <strong>Time:</strong> {formatTime(selectedReservation.startTime)} - {formatTime(selectedReservation.endTime)}<br />
                    <strong>Credit Cost:</strong> {selectedReservation.creditCost}€
                  </div>
                  <p className="text-warning">
                    <MDBIcon fas icon="exclamation-triangle" className="me-2" />
                    This action cannot be undone. Your credit will be refunded.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <MDBBtn color="secondary" onClick={() => setShowCancelModal(false)}>
                  Keep Reservation
                </MDBBtn>
                <MDBBtn 
                  color="danger" 
                  onClick={handleCancelReservation}
                  disabled={canceling}
                >
                  {canceling ? (
                    <>
                      <MDBSpinner size="sm" className="me-2" />
                      Canceling...
                    </>
                  ) : (
                    'Cancel Reservation'
                  )}
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      )}
    </>
  );
};

export default UserReservations;
