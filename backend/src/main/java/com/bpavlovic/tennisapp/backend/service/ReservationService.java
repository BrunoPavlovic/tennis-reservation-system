package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CreateReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationOverviewDto;
import com.bpavlovic.tennisapp.backend.dto.ReservationRequestDto;
import com.bpavlovic.tennisapp.backend.mapper.ReservationDtoMapper;
import com.bpavlovic.tennisapp.backend.mapper.ReservationMapper;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.model.Reservation;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CourtService courtService;
    private final UserService userService;
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

    public Page<ReservationOverviewDto> getReservationForUser(int page, int size){
        User user = userService.getUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        Page<Reservation> reservations = reservationRepository.findByUser(user, pageable);

        return reservations.map(reservationDtoMapper::toOverviewDto);
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

    public void cancelReservation(Integer reservationId){
        try {
            Reservation reservation = reservationRepository.findById(Long.valueOf(reservationId))
                    .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

            if (!reservation.getUser().getEmail().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                throw new IllegalArgumentException("You can only cancel your own reservations");
            }

            LocalDate today = LocalDate.now();
            if (reservation.getDate().isBefore(today)) {
                throw new IllegalArgumentException("Cannot cancel past reservations");
            }

            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getStartTime());
            LocalDateTime now = LocalDateTime.now();
            if (reservationDateTime.minusHours(24).isBefore(now)) {
                throw new IllegalArgumentException("Reservations can only be cancelled up to 24 hours in advance");
            }

            reservationRepository.delete(reservation);
            creditTransactionService.saveRefund(reservation);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
