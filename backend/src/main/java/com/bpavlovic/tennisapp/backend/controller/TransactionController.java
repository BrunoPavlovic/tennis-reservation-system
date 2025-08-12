package com.bpavlovic.tennisapp.backend.controller;

import com.bpavlovic.tennisapp.backend.dto.TransactionOverviewDto;
import com.bpavlovic.tennisapp.backend.service.CreditTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final CreditTransactionService creditTransactionService;

    @GetMapping
    public ResponseEntity<?> getTransactionsForUser(){
        try {
            List<TransactionOverviewDto> transactions = creditTransactionService.getTransactionsForUser();
            return ResponseEntity.ok(transactions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
