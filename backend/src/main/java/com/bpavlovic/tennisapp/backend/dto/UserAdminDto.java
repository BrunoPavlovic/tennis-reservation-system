package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class UserAdminDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Double creditAmount;
    private String createdAt;
    private Boolean active;
}
