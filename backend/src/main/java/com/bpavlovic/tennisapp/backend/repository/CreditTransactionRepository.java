package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.CreditTransaction;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
    boolean existsByPaymentIntentId(String paymentIntentId);
    List<CreditTransaction> findByUser(User user);
}
