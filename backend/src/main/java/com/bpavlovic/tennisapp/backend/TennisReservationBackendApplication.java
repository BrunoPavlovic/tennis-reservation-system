package com.bpavlovic.tennisapp.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TennisReservationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TennisReservationBackendApplication.class, args);
	}

}
