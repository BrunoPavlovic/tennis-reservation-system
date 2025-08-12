package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.CreditTransaction;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
    boolean existsByPaymentIntentId(String paymentIntentId);
    Page<CreditTransaction> findByUser(User user, Pageable pageable);
}
