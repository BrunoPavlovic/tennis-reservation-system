package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreditTransactionDto;
import com.bpavlovic.tennisapp.backend.mapper.CreditTransactionMapper;
import com.bpavlovic.tennisapp.backend.model.CreditTransaction;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.repository.CreditTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreditTransactionService {

    private final CreditTransactionRepository creditTransactionRepository;
    private final CreditTransactionMapper creditTransactionMapper;

    public void savePayment(CreditTransactionDto creditTransactionDto, String paymentIntentId){
        CreditTransaction creditTransaction = creditTransactionMapper.toEntity(creditTransactionDto, paymentIntentId);
        creditTransactionRepository.save(creditTransaction);
    }

    public void saveReservation(Reservation reservation){
        CreditTransaction creditTransaction = creditTransactionMapper.toEntity(reservation);
    }

    public boolean existsByPaymentIntentId(String paymentIntentId){
        return creditTransactionRepository.existsByPaymentIntentId(paymentIntentId);
    }

}
