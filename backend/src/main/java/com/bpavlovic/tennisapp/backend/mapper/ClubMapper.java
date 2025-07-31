package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.ClubDto;
import com.bpavlovic.tennisapp.backend.model.Club;
import org.springframework.stereotype.Component;

@Component
public class ClubMapper {
    public ClubDto toDto(Club club){
        ClubDto clubDto = new ClubDto();
        clubDto.setName(club.getName());
        clubDto.setCreditPrice(club.getCreditPrice());
        return clubDto;
    }
}
