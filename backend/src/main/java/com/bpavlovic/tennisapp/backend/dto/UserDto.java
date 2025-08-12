package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String club;
    private Double credit;
}
