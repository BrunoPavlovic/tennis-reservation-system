package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.CourtAdminDto;
import com.bpavlovic.tennisapp.backend.model.Court;
import org.springframework.stereotype.Component;

@Component
public class CourtAdminMapper {
    
    public CourtAdminDto toDto(Court court) {
        CourtAdminDto courtAdminDto = new CourtAdminDto();
        courtAdminDto.setName(court.getName());
        courtAdminDto.setClubName(court.getClub().getName());
        return courtAdminDto;
    }
}
