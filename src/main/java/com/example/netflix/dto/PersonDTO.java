package com.example.netflix.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String birthDateV2;
    private String imageUrl;
    private List<String> qualities;
    public String getName() {
        return this.firstName + " " + this.lastName;
    }

}
