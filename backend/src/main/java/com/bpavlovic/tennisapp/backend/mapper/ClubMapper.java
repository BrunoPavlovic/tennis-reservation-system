package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.ClubDto;
import com.bpavlovic.tennisapp.backend.model.Club;
import org.springframework.stereotype.Component;

@Component
public class ClubMapper {
    public ClubDto toDto(Club club){
        ClubDto clubDto = new ClubDto();
        clubDto.setName(club.getClubName());
        clubDto.setCreditPrice(clubDto.getCreditPrice());
        return clubDto;
    }
}
