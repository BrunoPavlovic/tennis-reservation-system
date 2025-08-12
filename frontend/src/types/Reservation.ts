export interface Court {
  name: string;
}

export interface Club {
  clubId: number;
  name: string;
  creditPrice: number;
}

export interface Reservation {
  reservationId: number;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  creditCost: number;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}

export interface CreateReservationDto {
  date: string;
  club: string;
  court: string;
  startTime: string;
  endTime: string;
}

export interface ReservationRequestDto {
  date: string;
  club: string;
  court: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  reservation?: Reservation;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}
