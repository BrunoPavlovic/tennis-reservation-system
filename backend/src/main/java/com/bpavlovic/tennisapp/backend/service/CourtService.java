package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.CourtDto;
import com.bpavlovic.tennisapp.backend.mapper.CourtMapper;
import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourtService {

    private final CourtRepository courtRepository;
    private final ClubService clubService;
    private final CourtMapper courtMapper;

    public List<CourtDto> getCourtsByClub(String clubName){
        Club club = clubService.getClubByName(clubName);
        System.out.println("Looking for courts in club: " + clubName + " (ID: " + club.getClubId() + ")");
        List<Court> courts = courtRepository.findByClub(club);
        System.out.println("Found " + courts.size() + " courts");
        return courts.stream()
                .map(courtMapper::toDto)
                .collect(Collectors.toList());
    }

    public Court getCourtByClubAndName(String clubName, String courtName){
        Club club = clubService.getClubByName(clubName);
        return courtRepository.findByClubAndName(club, courtName);
    }
}
