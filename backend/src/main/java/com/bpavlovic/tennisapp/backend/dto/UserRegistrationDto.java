package com.bpavlovic.tennisapp.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRegistrationDto {
    @NotBlank
    @Size(max = 25, message = "First name must be 25 characters or less")
    private String firstName;
    @NotBlank
    @Size(max = 25, message = "Last name must be 25 characters or less")
    private String lastName;
    @Email
    private String email;
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{12,}$",
            message = "Password ( 12 characters, 1 uppercase, 1 lowercase,1 number and 1 special character )"
    )
    private String password;
    @NotBlank
    private String club;
}
