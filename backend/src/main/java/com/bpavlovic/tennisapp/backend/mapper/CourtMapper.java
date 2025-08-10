package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.CourtDto;
import com.bpavlovic.tennisapp.backend.model.Court;
import org.springframework.stereotype.Component;

@Component
public class CourtMapper {
    public CourtDto toDto(Court court){
        CourtDto courtDto = new CourtDto();
        courtDto.setName(court.getName());
        return courtDto;
    }
}
