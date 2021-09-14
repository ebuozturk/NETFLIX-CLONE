package com.example.netflix.dto;

import com.example.netflix.enums.AppUserRole;
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
public class AppUserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String imageUrl;
    private AppUserRole role;
    private List<MovieAllDetailsDTO> favourites = new ArrayList<>();
    private List<MovieListDTO> lists = new ArrayList<>();

}
