package com.bpavlovic.tennisapp.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MEMBERSHIP")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer membershipId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;
}

