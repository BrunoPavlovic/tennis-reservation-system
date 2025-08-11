package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.ReservationDto;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class ReservationDtoMapper {
    
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    public ReservationDto toDto(Reservation reservation) {
        ReservationDto dto = new ReservationDto();
        dto.setReservationId(reservation.getReservationId());
        dto.setCourtName(reservation.getCourt().getName());
        dto.setDate(reservation.getDate().format(DATE_FORMATTER));
        dto.setStartTime(reservation.getStartTime().format(TIME_FORMATTER));
        dto.setEndTime(reservation.getEndTime().format(TIME_FORMATTER));
        dto.setCreditCost(reservation.getCreditCost());
        dto.setCreatedAt(reservation.getCreatedAt().toString());
        dto.setUserFirstName(reservation.getUser().getFirstName());
        dto.setUserLastName(reservation.getUser().getLastName());
        dto.setUserEmail(reservation.getUser().getEmail());
        return dto;
    }
}
