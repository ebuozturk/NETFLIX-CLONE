package com.example.netflix.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailsDTO {
    private Long id;
    private String name;
    private String storyline;
    private String imageUrl;
    private String logoUrl;
    private String detailPosterUrl;
}
