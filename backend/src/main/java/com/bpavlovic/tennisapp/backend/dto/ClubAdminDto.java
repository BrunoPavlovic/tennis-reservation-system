package com.bpavlovic.tennisapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClubAdminDto {
    private Long clubId;
    private String name;
    private Double creditPrice;
    private Timestamp createdAt;
    private Integer courtCount;
    private Integer memberCount;
}
