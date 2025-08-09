package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class PaymentVerificationResponse {
    private double newCredit;
    private double amountFromStripe;
    private boolean success;
    private String message;

    public PaymentVerificationResponse(double newCredit, double amountFromStripe, boolean success, String message) {
        this.newCredit = newCredit;
        this.amountFromStripe = amountFromStripe;
        this.success = success;
        this.message = message;
    }
}
