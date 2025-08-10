package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.ClubDto;
import com.bpavlovic.tennisapp.backend.mapper.ClubMapper;
import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMapper clubMapper;

    @Cacheable(value = "clubs")
    public List<ClubDto> getAllClubs() {
        List<Club> allClubs = clubRepository.findAll();
        return allClubs.stream()
                .map(clubMapper::toDto)
                .collect(Collectors.toList());
    }

    public Club getClubByName(String clubName){
        System.out.println("Looking for club with name: " + clubName);
        Club club = clubRepository.findByName(clubName);
        if (club != null) {
            System.out.println("Found club: " + club.getName() + " (ID: " + club.getClubId() + ")");
        } else {
            System.out.println("Club not found!");
        }
        return club;
    }
}
