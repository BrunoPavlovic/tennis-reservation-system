package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreateReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationRequestDto;
import com.bpavlovic.tennisapp.backend.mapper.ReservationDtoMapper;
import com.bpavlovic.tennisapp.backend.mapper.ReservationMapper;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CourtService courtService;
    private final ReservationMapper reservationMapper;
    private final ReservationDtoMapper reservationDtoMapper;
    private final CreditTransactionService creditTransactionService;

    public List<ReservationDto> getReservationsByDateAndCourt(ReservationRequestDto reservationRequestDto){
        try {
            Court court = courtService.getCourtByClubAndName(reservationRequestDto.getClub(), reservationRequestDto.getCourt());
            List<Reservation> reservations = reservationRepository.getReservationByDateAndCourt(reservationRequestDto.getDate(), court);
            return reservations.stream()
                    .map(reservationDtoMapper::toDto)
                    .collect(Collectors.toList());
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
