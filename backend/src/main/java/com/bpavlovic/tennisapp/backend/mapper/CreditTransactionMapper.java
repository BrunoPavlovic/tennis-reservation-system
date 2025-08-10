package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.CreditTransactionDto;
import com.bpavlovic.tennisapp.backend.model.CreditTransaction;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class CreditTransactionMapper {

    public CreditTransaction toEntity(CreditTransactionDto creditTransactionDto, String paymentIntentId){
        CreditTransaction creditTransaction = new CreditTransaction();
        creditTransaction.setUser(creditTransactionDto.getUser());
        creditTransaction.setAmount(creditTransactionDto.getAmount());
        creditTransaction.setType(creditTransactionDto.getType());
        creditTransaction.setTimestamp(new Timestamp(System.currentTimeMillis()));

        if (paymentIntentId != null){
            creditTransaction.setPaymentIntentId(paymentIntentId);
        }

        return creditTransaction;
    }

    public CreditTransaction toEntity(Reservation reservation) {
        CreditTransaction creditTransaction = new CreditTransaction();
        creditTransaction.setUser(reservation.getUser());
        creditTransaction.setAmount(-reservation.getCreditCost());
        creditTransaction.setType("RESERVATION");
        creditTransaction.setTimestamp(new Timestamp(System.currentTimeMillis()));

        return creditTransaction;
    }
}
