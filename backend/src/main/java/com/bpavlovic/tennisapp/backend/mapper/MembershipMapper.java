package com.bpavlovic.tennisapp.backend.mapper;

import com.bpavlovic.tennisapp.backend.dto.MembershipDto;
import com.bpavlovic.tennisapp.backend.model.Membership;
import com.bpavlovic.tennisapp.backend.service.ClubService;
import com.bpavlovic.tennisapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MembershipMapper {

    private final UserService userService;
    private final ClubService clubService;

    public Membership toEntity(MembershipDto membershipDto){
        Membership membership = new Membership();
        membership.setUser(userService.getUserById(membershipDto.getUserId()));
        membership.setClub(clubService.getClubByName(membershipDto.getClubName()));
        return membership;
    }

    public MembershipDto toDto(Long userId, String clubName){
        MembershipDto membershipDto = new MembershipDto();
        membershipDto.setUserId(Math.toIntExact(userId));
        membershipDto.setClubName(clubName);
        return membershipDto;
    }
}
