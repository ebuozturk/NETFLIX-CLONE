package com.example.netflix.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieListDTO {
    private Long id;
    private String name;
    private String description;
    private String coverImageUrl;
}
