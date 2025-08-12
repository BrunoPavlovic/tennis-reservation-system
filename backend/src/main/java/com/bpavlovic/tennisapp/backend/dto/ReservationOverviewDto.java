package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class ReservationOverviewDto {
    private String clubName;
    private String courtName;
    private String date;
    private String startTime;
    private String endTime;
    private Double creditCost;
}
