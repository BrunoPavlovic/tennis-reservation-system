package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.Membership;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Integer> {
    Membership findMembershipByUser(User user);
}
