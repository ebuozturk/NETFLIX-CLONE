package com.example.netflix.entity;



import com.example.netflix.entity.Movie;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


@Data
@NoArgsConstructor
@Entity
public class Person {

    @Id
    @SequenceGenerator(name = "person_sequence",sequenceName = "person_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "person_sequence")
    private Long id;
    private String firstName;
    private String lastName;
    @Temporal(TemporalType.DATE)
    private Calendar birthDate;
    private String imageUrl;
    @ElementCollection
    private Set<String> qualities = new HashSet<>();

    @ManyToMany(mappedBy = "cast")
    @ToString.Exclude
    private Set<Movie> movies = new HashSet<>();

    public String getName(){
        return this.firstName+" "+this.lastName;
    }



    public String getBirthDate(){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String str = "";
        if(birthDate != null)
            str = formatter.format(birthDate.getTime());
        return str;

    }

    public String getBirthDateV2(){
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");
        String str = "";
        if(birthDate != null)
            str = formatter.format(birthDate.getTime());
        return str;
    }
    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate=" + birthDate +
                ", imageUrl='" + imageUrl + '\'' +
                ", qualities=" + qualities +
                '}';
    }

    public Person(String firstName) {
        this.firstName = firstName;
    }
}
