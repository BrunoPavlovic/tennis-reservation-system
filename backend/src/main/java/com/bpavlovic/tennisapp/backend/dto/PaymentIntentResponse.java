package com.bpavlovic.tennisapp.backend.dto;

import lombok.Data;

@Data
public class PaymentIntentResponse {
    private String url;

    public PaymentIntentResponse(String url) {
        this.url = url;
    }
}
