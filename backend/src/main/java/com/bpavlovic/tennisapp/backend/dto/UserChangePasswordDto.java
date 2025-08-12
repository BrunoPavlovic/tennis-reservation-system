package com.bpavlovic.tennisapp.backend.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserChangePasswordDto {
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{12,}$",
            message = "Password ( 12 characters, 1 uppercase, 1 lowercase,1 number and 1 special character )"
    )
    private String password;
}
