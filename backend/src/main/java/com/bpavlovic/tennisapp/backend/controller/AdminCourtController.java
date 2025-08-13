package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.CourtAdminDto;
import com.bpavlovic.tennisapp.backend.service.CourtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/courts")
@RequiredArgsConstructor
public class AdminCourtController {

    private final CourtService courtService;

    @GetMapping
    public ResponseEntity<?> getCourtsByClub(
            @RequestParam String clubName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<CourtAdminDto> courts = courtService.getCourtsByClubForAdmin(clubName, pageable);
            return new ResponseEntity<>(courts, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createCourt(@RequestBody CourtAdminDto courtAdminDto) {
        try {
            CourtAdminDto createdCourt = courtService.createCourtForAdmin(courtAdminDto);
            return new ResponseEntity<>(createdCourt, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{clubName}/{courtName}")
    public ResponseEntity<?> updateCourt(
            @PathVariable String clubName,
            @PathVariable String courtName,
            @RequestBody CourtAdminDto courtAdminDto) {
        try {
            CourtAdminDto updatedCourt = courtService.updateCourtForAdmin(clubName, courtName, courtAdminDto);
            return new ResponseEntity<>(updatedCourt, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{clubName}/{courtName}")
    public ResponseEntity<?> deleteCourt(
            @PathVariable String clubName,
            @PathVariable String courtName) {
        try {
            courtService.deleteCourt(clubName, courtName);
            return new ResponseEntity<>("Court deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
