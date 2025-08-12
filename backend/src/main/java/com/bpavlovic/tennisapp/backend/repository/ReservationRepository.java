package com.bpavlovic.tennisapp.backend.repository;

import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> getReservationByDateAndCourt(LocalDate date, Court court);
    List<Reservation> findByUser(User user);
}
