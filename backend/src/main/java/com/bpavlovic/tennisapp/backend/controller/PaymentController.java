package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.PaymentIntentRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentIntentResponse;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationRequest;
import com.bpavlovic.tennisapp.backend.dto.PaymentVerificationResponse;
import com.bpavlovic.tennisapp.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentIntentRequest paymentIntentRequest) {
        try {
            String url = paymentService.createCheckoutSession(paymentIntentRequest);
            return ResponseEntity.ok(new PaymentIntentResponse(url));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating session: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationRequest paymentVerificationRequest) {
        try {
            PaymentVerificationResponse response = paymentService.verifyPayment(paymentVerificationRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Payment verification failed: " + e.getMessage());
        }
    }
}
