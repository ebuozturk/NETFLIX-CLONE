package com.example.netflix.dto;


import com.example.netflix.entity.Movie;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonWithMoviesDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String birthDateV2;
    private String imageUrl;
    private List<String> qualities = new ArrayList<>();
    private List<MovieDTO> movies = new ArrayList<>();
    public String getName(){
        return this.firstName+" "+this.lastName;
    }

}
