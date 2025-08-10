package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    Club findByName(String name);
}
