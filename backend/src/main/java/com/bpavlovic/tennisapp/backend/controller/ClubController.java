package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.ClubCreditRequestDto;
import com.bpavlovic.tennisapp.backend.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<?> getAllClubs(){
        try {
            return new ResponseEntity<>( clubService.getAllClubs(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/price")
    public ResponseEntity<?> getCreditPriceForClub(ClubCreditRequestDto clubCreditRequestDto){
        try {
            return new ResponseEntity<>( clubService.getClubByName(clubCreditRequestDto.getClubName()).getCreditPrice(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
