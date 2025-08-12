package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.CreditResponseDto;
import com.bpavlovic.tennisapp.backend.dto.UserChangeEmailDto;
import com.bpavlovic.tennisapp.backend.dto.UserChangePasswordDto;
import com.bpavlovic.tennisapp.backend.dto.UserDto;
import com.bpavlovic.tennisapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getUser() {
        try {
            UserDto userDto = userService.getUser();
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error retrieving user data");
        }
    }

    @PutMapping("/credit")
    public ResponseEntity<?> updateCredit(@RequestBody CreditResponseDto creditRequest) {
        try {
            Double updatedCredit = userService.updateCreditAmount(SecurityContextHolder.getContext().getAuthentication().getName(), creditRequest.getCredit());
            CreditResponseDto response = new CreditResponseDto(updatedCredit);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating credit amount");
        }
    }

    @PutMapping("/email")
    public ResponseEntity<?> updateEmail(@RequestBody UserChangeEmailDto userChangeEmailDto){
        try {
            userService.updateEmail(userChangeEmailDto.getEmail());
            return new ResponseEntity<>("User email is updated successfully!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody UserChangePasswordDto userChangePasswordDto){
        try {
            userService.updatePassword(userChangePasswordDto.getPassword());
            return new ResponseEntity<>("User password is updated successfully!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
