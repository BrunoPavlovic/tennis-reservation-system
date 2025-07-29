package com.bpavlovic.tennisapp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDto {
    private String email;
    private String password;
}
