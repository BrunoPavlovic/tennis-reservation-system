package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.CreditResponseDto;
import com.bpavlovic.tennisapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/credit")
    public ResponseEntity<?> getCredit() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            Double creditAmount = userService.getCreditAmount(userEmail);
            CreditResponseDto response = new CreditResponseDto(creditAmount);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error retrieving credit amount");
        }
    }

    @PutMapping("/credit")
    public ResponseEntity<?> updateCredit(@RequestBody CreditResponseDto creditRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            Double updatedCredit = userService.updateCreditAmount(userEmail, creditRequest.getCredit());
            CreditResponseDto response = new CreditResponseDto(updatedCredit);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {

            return ResponseEntity.internalServerError().body("Error updating credit amount");
        }
    }
}
