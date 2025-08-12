package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateReservationDto {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;
    private String club;
    private String court;
    private LocalTime startTime;
    private LocalTime endTime;
}
