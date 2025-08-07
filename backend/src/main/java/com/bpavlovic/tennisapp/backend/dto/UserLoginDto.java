package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    private String email;
    private String password;
}
