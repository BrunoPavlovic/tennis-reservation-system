package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.ClubAdminDto;
import com.bpavlovic.tennisapp.backend.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/clubs")
@RequiredArgsConstructor
public class AdminClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<?> getAllClubs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ClubAdminDto> clubs = clubService.getAllClubsForAdmin(pageable);
            return new ResponseEntity<>(clubs, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    @PostMapping
    public ResponseEntity<?> createClub(@RequestBody ClubAdminDto clubAdminDto) {
        try {
            ClubAdminDto createdClub = clubService.createClubForAdmin(clubAdminDto);
            return new ResponseEntity<>(createdClub, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClub(@PathVariable Long id, @RequestBody ClubAdminDto clubAdminDto) {
        try {
            ClubAdminDto updatedClub = clubService.updateClubForAdmin(id, clubAdminDto);
            return new ResponseEntity<>(updatedClub, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClub(@PathVariable Long id) {
        try {
            clubService.deleteClub(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
