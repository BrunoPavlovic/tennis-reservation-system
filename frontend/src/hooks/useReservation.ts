import { useState, useEffect } from 'react';
import api from '../services/axios';
import { Court, Reservation, CreateReservationDto, ReservationRequestDto, DaySchedule, TimeSlot } from '../types/Reservation';

export const useReservation = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [selectedCourt, setSelectedCourt] = useState<string>('');
    const [clubName, setClubName] = useState<string>('');
    const [creditCost, setCreditCost] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchCourts = async (club: string) => {
        try {
            setIsLoading(true);
            const response = await api.get(`/courts?club=${encodeURIComponent(club)}`);
            setCourts(response.data);
            if (response.data.length > 0 && !selectedCourt) {
                setSelectedCourt(response.data[0].name);
            }
        } catch (error) {
            console.error('Error fetching courts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCreditCost = async (club: string) => {
        try {
            const response = await api.get(`/clubs/price?club=${encodeURIComponent(club)}`);
            setCreditCost(response.data);
        } catch (error) {
            console.error('Error fetching credit cost:', error);
        }
    };


    const fetchReservations = async (date: string, club: string, court: string): Promise<Reservation[]> => {
        try {
            const response = await api.get('/reservations', {
                params: {
                    date: date,
                    club: club,
                    court: court
                }
            });
            return response.data || [];
        } catch (error) {
            console.error('Error fetching reservations:', error);
            return [];
        }
    };

    const createReservation = async (reservationData: CreateReservationDto, currentCredit: number): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await api.post('/reservations', reservationData);
            if (response.status === 200) {
                const newCreditAmount = currentCredit - creditCost;
                await api.put('/users/credit', { credit: newCreditAmount });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error creating reservation:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const cancelReservation = async (reservationId: number, currentCredit: number): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await api.delete(`/reservations/${reservationId}`);
            if (response.status === 200) {
                const newCreditAmount = currentCredit + creditCost;
                await api.put('/users/credit', { credit: newCreditAmount });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error canceling reservation:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const generateTimeSlots = (): TimeSlot[] => {
        const slots: TimeSlot[] = [];
        const startHour = 8;
        const endHour = 20;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const nextMinute = minute + 30;
                const nextHour = hour + (nextMinute >= 60 ? 1 : 0);
                const nextMinuteAdjusted = nextMinute >= 60 ? nextMinute - 60 : nextMinute;
                const endTime = `${nextHour.toString().padStart(2, '0')}:${nextMinuteAdjusted.toString().padStart(2, '0')}`;

                slots.push({
                    startTime,
                    endTime,
                    isOccupied: false
                });
            }
        }

        return slots;
    };

    const generateWeekSchedule = async (startDate: Date, club: string, court: string): Promise<DaySchedule[]> => {
        const weekSchedule: DaySchedule[] = [];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const startDateObj = new Date(startDate);

        const reservationPromises: Promise<Reservation[]>[] = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDateObj);
            currentDate.setDate(startDateObj.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];
            reservationPromises.push(fetchReservations(dateString, club, court));
        }

        const weekReservations: Reservation[][] = await Promise.all(reservationPromises);
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDateObj);
            currentDate.setDate(startDateObj.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];

            const timeSlots = generateTimeSlots();
            const dayReservations = weekReservations[i] || [];

            // Mark occupied slots
            dayReservations.forEach((reservation: Reservation) => {
                const slotIndex = timeSlots.findIndex(slot => slot.startTime === reservation.startTime);
                if (slotIndex !== -1) {
                    timeSlots[slotIndex].isOccupied = true;
                    timeSlots[slotIndex].reservation = reservation;
                }
            });

            // Get the actual day name for this date
            const dayName = dayNames[currentDate.getDay()];
            weekSchedule.push({
                date: dateString,
                dayName: dayName,
                timeSlots
            });
        }

        return weekSchedule;
    };

    const initializeReservation = async (club: string) => {
        setClubName(club);
        await Promise.all([
            fetchCourts(club),
            fetchCreditCost(club)
        ]);
    };

    return {
        courts,
        selectedCourt,
        setSelectedCourt,
        clubName,
        creditCost,
        isLoading,
        reservations,
        fetchCourts,
        fetchCreditCost,
        fetchReservations,
        createReservation,
        cancelReservation,
        generateWeekSchedule,
        initializeReservation
    };
};
