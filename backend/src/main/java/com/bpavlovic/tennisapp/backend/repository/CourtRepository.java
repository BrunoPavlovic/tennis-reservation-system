package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.model.Court;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourtRepository extends JpaRepository<Court, Long> {
    List<Court> findByClub(Club club);
    Page<Court> getByClub(Club club, Pageable pageable);
    Court findByClubAndName(Club club, String courtName);
}
