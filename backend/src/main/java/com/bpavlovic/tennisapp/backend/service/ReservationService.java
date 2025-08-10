package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreateReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationRequestDto;
import com.bpavlovic.tennisapp.backend.mapper.ReservationMapper;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CourtService courtService;
    private final ReservationMapper reservationMapper;
    private final CreditTransactionService creditTransactionService;

    public List<Reservation> getReservationsByDateAndCourt(ReservationRequestDto reservationRequestDto){
        try {
            Court court = courtService.getCourtByClubAndName(reservationRequestDto.getClub(), reservationRequestDto.getCourt());
            return reservationRepository.getReservationByDateAndCourt(reservationRequestDto.getDate(), court);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void createReservation(CreateReservationDto createReservationDto){
        try {
            Reservation reservation = reservationMapper.toEntity(createReservationDto);
            reservationRepository.save(reservation);

            creditTransactionService.saveReservation(reservation);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
