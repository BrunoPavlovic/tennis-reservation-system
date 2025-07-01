package com.bpavlovic.tennisapp.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
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
