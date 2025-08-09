package com.bpavlovic.tennisapp.backend.dto;

import com.bpavlovic.tennisapp.backend.model.User;
import lombok.Data;

@Data
public class CreditTransactionDto {
    private User user;
    private double amount;
    private String type;

    public CreditTransactionDto(User user, double amount, String type){
        this.user = user;
        this.amount = amount;
        this.type = type;
    }
}
