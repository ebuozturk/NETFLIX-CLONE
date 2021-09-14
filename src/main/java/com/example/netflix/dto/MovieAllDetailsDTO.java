package com.example.netflix.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieAllDetailsDTO {
    private Long id;
    @NotEmpty(message = "not empty")
    private String name;
    private String imdb;
    private String storyline;
    private String imageUrl;
    private String videoUrl;
    private String logoUrl;
    private String detailPosterUrl;
    private String releaseYear;
    private String ageRestriction;
    private String length;
    private List<CategoryDTO> categories = new ArrayList<>();
    private List<PersonDTO> cast = new ArrayList<>();
    private List<PersonDTO> directors = new ArrayList<>();
//    private List<MovieListDTO> movieLists = new ArrayList<>();
}
