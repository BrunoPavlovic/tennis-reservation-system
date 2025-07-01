package com.bpavlovic.tennisapp.backend.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "CLUB")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clubId;

    private String clubName;

    private Double creditPrice;

    private Timestamp createdAt;

    @OneToMany(mappedBy = "club")
    private List<Membership> memberships;
}
