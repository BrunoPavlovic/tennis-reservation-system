package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.CourtDto;
import com.bpavlovic.tennisapp.backend.service.CourtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courts")
public class CourtController {

    private final CourtService courtService;

    @GetMapping
    public ResponseEntity<?> getCourtsByClub (@RequestParam String club){
        try {
            List<CourtDto> courts = courtService.getCourtsByClub(club);
            return ResponseEntity.ok(courts);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
