package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.model.Court;
import com.bpavlovic.tennisapp.backend.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourtService {

    private final CourtRepository courtRepository;
    private final ClubService clubService;

    public List<Court> getCourtsByClub(String clubName){
        Club club = clubService.getClubByName(clubName);
        System.out.println("Looking for courts in club: " + clubName + " (ID: " + club.getClubId() + ")");
        List<Court> courts = courtRepository.findByClub(club);
        System.out.println("Found " + courts.size() + " courts");
        return courts;
    }

    public Court getCourtByClubAndName(String clubName, String courtName){
        Club club = clubService.getClubByName(clubName);
        return courtRepository.findByClubAndName(club, courtName);
    }
}
