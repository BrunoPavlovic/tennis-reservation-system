package com.bpavlovic.tennisapp.backend.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserChangeEmailDto {
    @Email
    private String email;
}
