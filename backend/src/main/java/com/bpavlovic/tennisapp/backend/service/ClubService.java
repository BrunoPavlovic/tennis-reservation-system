package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.ClubAdminDto;
import com.bpavlovic.tennisapp.backend.dto.ClubDto;
import com.bpavlovic.tennisapp.backend.mapper.ClubAdminMapper;
import com.bpavlovic.tennisapp.backend.mapper.ClubMapper;
import com.bpavlovic.tennisapp.backend.model.Club;
import com.bpavlovic.tennisapp.backend.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMapper clubMapper;
    private final ClubAdminMapper clubAdminMapper;

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

    @CacheEvict(value = "clubs", allEntries = true)
    public void deleteClub(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));

        if (!club.getCourts().isEmpty()) {
            throw new IllegalArgumentException("Cannot delete club with existing courts");
        }
        if (!club.getMemberships().isEmpty()) {
            throw new IllegalArgumentException("Cannot delete club with existing memberships");
        }

        clubRepository.delete(club);
    }

    public Page<ClubAdminDto> getAllClubsForAdmin(Pageable pageable) {
        Page<Club> clubs = clubRepository.findAll(pageable);
        return clubs.map(clubAdminMapper::toDto);
    }



    @CacheEvict(value = "clubs", allEntries = true)
    public ClubAdminDto createClubForAdmin(ClubAdminDto clubAdminDto) {
        if (clubAdminDto.getName() == null || clubAdminDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Club name is required");
        }
        if (clubAdminDto.getCreditPrice() == null || clubAdminDto.getCreditPrice() <= 0) {
            throw new IllegalArgumentException("Credit price must be greater than 0");
        }

        Club club = new Club();
        club.setName(clubAdminDto.getName().trim());
        club.setCreditPrice(clubAdminDto.getCreditPrice());
        club.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        Club savedClub = clubRepository.save(club);
        return clubAdminMapper.toDto(savedClub);
    }

    @CacheEvict(value = "clubs", allEntries = true)
    public ClubAdminDto updateClubForAdmin(Long id, ClubAdminDto clubAdminDto) {
        Club existingClub = clubRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));

        if (clubAdminDto.getName() == null || clubAdminDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Club name is required");
        }
        if (clubAdminDto.getCreditPrice() == null || clubAdminDto.getCreditPrice() <= 0) {
            throw new IllegalArgumentException("Credit price must be greater than 0");
        }

        existingClub.setName(clubAdminDto.getName().trim());
        existingClub.setCreditPrice(clubAdminDto.getCreditPrice());

        Club updatedClub = clubRepository.save(existingClub);
        return clubAdminMapper.toDto(updatedClub);
    }
}
