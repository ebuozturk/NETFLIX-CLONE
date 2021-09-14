package com.example.netflix.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieListWithMoviesAndUserDTO {
    private Long id;
    private String name;
    private String description;
    private String coverImageUrl;
    private List<MovieDTO> movies = new ArrayList<>();
    private AppUserDTO user;
}
