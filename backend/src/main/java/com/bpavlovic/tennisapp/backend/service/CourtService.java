package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CourtAdminDto;
import com.bpavlovic.tennisapp.backend.dto.CourtDto;
import com.bpavlovic.tennisapp.backend.mapper.CourtAdminMapper;
import com.bpavlovic.tennisapp.backend.mapper.CourtMapper;
import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourtService {

    private final CourtRepository courtRepository;
    private final ClubService clubService;
    private final CourtMapper courtMapper;
    private final CourtAdminMapper courtAdminMapper;

    @Cacheable(value = "courts")
    public List<CourtDto> getCourtsByClub(String clubName){
        Club club = clubService.getClubByName(clubName);
        List<Court> courts = courtRepository.findByClub(club);
        return courts.stream()
                .map(courtMapper::toDto)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "courts")
    public Page<CourtAdminDto> getCourtsByClubForAdmin(String clubName, Pageable pageable){
        Club club = clubService.getClubByName(clubName);
        Page<Court> courts = courtRepository.getByClub(club, pageable);
        return courts.map(courtAdminMapper::toDto);
    }

    public Court getCourtByClubAndName(String clubName, String courtName){
        Club club = clubService.getClubByName(clubName);
        return courtRepository.findByClubAndName(club, courtName);
    }

    @CacheEvict(value = "courts", allEntries = true)
    public CourtAdminDto createCourtForAdmin(CourtAdminDto courtAdminDto) {
        if (courtAdminDto.getName() == null || courtAdminDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Court name is required");
        }

        Club club = clubService.getClubByName(courtAdminDto.getClubName());
        if (club == null) {
            throw new IllegalArgumentException("Club not found");
        }

        Court existingCourt = courtRepository.findByClubAndName(club, courtAdminDto.getName().trim());
        if (existingCourt != null) {
            throw new IllegalArgumentException("Court with this name already exists in this club");
        }

        Court court = new Court();
        court.setName(courtAdminDto.getName().trim());
        court.setClub(club);

        Court savedCourt = courtRepository.save(court);
        return courtAdminMapper.toDto(savedCourt);
    }

    @CacheEvict(value = "courts", allEntries = true)
    public CourtAdminDto updateCourtForAdmin(String clubName, String courtName, CourtAdminDto courtAdminDto) {
        Club club = clubService.getClubByName(clubName);
        if (club == null) {
            throw new IllegalArgumentException("Club not found");
        }

        Court existingCourt = courtRepository.findByClubAndName(club, courtName);
        if (existingCourt == null) {
            throw new IllegalArgumentException("Court not found");
        }

        if (courtAdminDto.getName() == null || courtAdminDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Court name is required");
        }

        Court courtWithNewName = courtRepository.findByClubAndName(club, courtAdminDto.getName().trim());
        if (courtWithNewName != null && !courtWithNewName.getCourtId().equals(existingCourt.getCourtId())) {
            throw new IllegalArgumentException("Court with this name already exists in this club");
        }

        existingCourt.setName(courtAdminDto.getName().trim());
        Court updatedCourt = courtRepository.save(existingCourt);
        return courtAdminMapper.toDto(updatedCourt);
    }

    @CacheEvict(value = "courts", allEntries = true)
    public void deleteCourt(String clubName, String courtName) {
        Club club = clubService.getClubByName(clubName);
        if (club == null) {
            throw new IllegalArgumentException("Club not found");
        }

        Court court = courtRepository.findByClubAndName(club, courtName);
        if (court == null) {
            throw new IllegalArgumentException("Court not found");
        }

        if (!court.getReservations().isEmpty()) {
            throw new IllegalArgumentException("Cannot delete court with existing reservations");
        }

        courtRepository.delete(court);
    }
}
