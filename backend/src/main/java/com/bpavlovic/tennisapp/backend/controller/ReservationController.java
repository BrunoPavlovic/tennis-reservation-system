package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.CreateReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationRequestDto;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<?> getReservationsForDate(ReservationRequestDto reservationRequestDto){
        try {
            List<Reservation> reservations = reservationService.getReservationsByDateAndCourt(reservationRequestDto);
            return ResponseEntity.ok(reservations);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody CreateReservationDto createReservationDto){
        try {
            reservationService.createReservation(createReservationDto);
            return new ResponseEntity<>("Reservation is created successfully!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
