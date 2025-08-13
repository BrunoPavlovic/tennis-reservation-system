package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmailForUpdate(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.role != 'ADMIN' ORDER BY u.active DESC, u.firstName ASC, u.lastName ASC")
    Page<User> findAllNonAdminUsersOrderedByActive(Pageable pageable);
}
