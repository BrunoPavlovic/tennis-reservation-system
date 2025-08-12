package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.*;
import com.bpavlovic.tennisapp.backend.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
            List<ReservationDto> reservations = reservationService.getReservationsByDateAndCourt(reservationRequestDto);
            return ResponseEntity.ok(reservations);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getReservationsForUser(@RequestParam(defaultValue = "0") int page){
        try {
            Page<ReservationOverviewDto> reservations = reservationService.getReservationForUser(page, 5);
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

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> cancelReservation(@PathVariable Integer reservationId){
        try {
            reservationService.cancelReservation(reservationId);
            return new ResponseEntity<>("Reservation cancelled successfully!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
