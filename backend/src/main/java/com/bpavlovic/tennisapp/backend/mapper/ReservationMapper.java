package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.CreateReservationDto;
import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.service.ClubService;
import com.bpavlovic.tennisapp.backend.service.CourtService;
import com.bpavlovic.tennisapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class ReservationMapper {

    private final UserService userService;
    private final CourtService courtService;
    private final ClubService clubService;

    public Reservation toEntity(CreateReservationDto createReservationDto){
        Reservation reservation = new Reservation();

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        reservation.setUser(user);

        Court court = courtService.getCourtByClubAndName(createReservationDto.getClub(), createReservationDto.getCourt());
        reservation.setCourt(court);

        Club club = clubService.getClubByName(createReservationDto.getClub());
        reservation.setCreditCost(club.getCreditPrice());

        reservation.setDate(createReservationDto.getDate());
        reservation.setStartTime(createReservationDto.getStartTime());
        reservation.setEndTime(createReservationDto.getEndTime());
        reservation.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return reservation;
    }
}
