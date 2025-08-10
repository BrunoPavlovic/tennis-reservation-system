package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class ReservationDto {
    private Integer reservationId;
    private String courtName;
    private String date;
    private String startTime;
    private String endTime;
    private Double creditCost;
    private String createdAt;
}
