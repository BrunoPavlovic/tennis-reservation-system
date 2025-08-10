package com.bpavlovic.tennisapp.backend.service;

import com.bpavlovic.tennisapp.backend.dto.MembershipDto;
import com.bpavlovic.tennisapp.backend.mapper.MembershipMapper;
import com.bpavlovic.tennisapp.backend.model.Membership;
import com.bpavlovic.tennisapp.backend.model.User;
import com.bpavlovic.tennisapp.backend.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final MembershipMapper membershipMapper;

    public void addMembership(MembershipDto membershipDto){
        Membership membership = membershipMapper.toEntity(membershipDto);
        membershipRepository.save(membership);
    }
}
