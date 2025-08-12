package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class TransactionOverviewDto {
    private Timestamp timestamp;
    private Double amount;
    private String type;
}
