package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreditTransactionDto;
import com.bpavlovic.tennisapp.backend.dto.TransactionOverviewDto;
import com.bpavlovic.tennisapp.backend.mapper.CreditTransactionMapper;
import com.bpavlovic.tennisapp.backend.model.CreditTransaction;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.CreditTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreditTransactionService {

    private final CreditTransactionRepository creditTransactionRepository;
    private final CreditTransactionMapper creditTransactionMapper;
    private final UserService userService;

    public void savePayment(CreditTransactionDto creditTransactionDto, String paymentIntentId){
        CreditTransaction creditTransaction = creditTransactionMapper.toEntity(creditTransactionDto, paymentIntentId);
        creditTransactionRepository.save(creditTransaction);
    }

    public void saveReservation(Reservation reservation){
        CreditTransaction creditTransaction = creditTransactionMapper.toEntity(reservation);
        creditTransactionRepository.save(creditTransaction);
    }

    public boolean existsByPaymentIntentId(String paymentIntentId){
        return creditTransactionRepository.existsByPaymentIntentId(paymentIntentId);
    }

    public void saveRefund(Reservation reservation){
        CreditTransaction creditTransaction = creditTransactionMapper.toRefundEntity(reservation);
        creditTransactionRepository.save(creditTransaction);
    }

    public Page<TransactionOverviewDto> getTransactionsForUser(int page, int size){
        User user = userService.getUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<CreditTransaction> transactions = creditTransactionRepository.findByUser(user, pageable);
        return transactions.map(creditTransactionMapper::toDto);
    }

}
