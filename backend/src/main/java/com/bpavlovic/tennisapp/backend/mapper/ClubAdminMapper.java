package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.ClubAdminDto;
import com.bpavlovic.tennisapp.backend.model.Club;
import org.springframework.stereotype.Component;

@Component
public class ClubAdminMapper {
    
    public ClubAdminDto toDto(Club club) {
        if (club == null) {
            return null;
        }
        
        ClubAdminDto dto = new ClubAdminDto();
        dto.setClubId(club.getClubId());
        dto.setName(club.getName());
        dto.setCreditPrice(club.getCreditPrice());
        dto.setCreatedAt(club.getCreatedAt());
        dto.setCourtCount(club.getCourts() != null ? club.getCourts().size() : 0);
        dto.setMemberCount(club.getMemberships() != null ? club.getMemberships().size() : 0);
        
        return dto;
    }
}
