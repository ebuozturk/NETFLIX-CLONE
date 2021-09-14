package com.example.netflix.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoviePostRequest {

    private String name;
    private String imdb;
    private String releaseYear;
    private String storyline;
    private String length;
    private String  ageRestriction;
    private List<PersonDTO> cast;
    private List<PersonDTO> directors;
    private List<CategoryDTO> categories;

}
