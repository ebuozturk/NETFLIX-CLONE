package com.example.netflix.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class MovieList {

    @Id
    @SequenceGenerator(name = "movie_list_sequence", sequenceName = "movie_list_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_list_sequence")
    private Long id;
    private String name;
    private String description;
    private String coverImageUrl;

    @ToString.Exclude
    @ManyToMany
    @JoinTable(
            name="list_movie",
            joinColumns = @JoinColumn(name="list_id"),
            inverseJoinColumns = @JoinColumn(name="movie_id")
    )
    @Column(nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Set<Movie> movies = new HashSet<>();

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private AppUser user;

    public void addMovie(Movie movie){
        this.movies.add(movie);
    }

    public void removeMovie(Movie movie){
        movies.remove(movie);
    }
    public MovieList(String name, String description){
        this.name = name;
        this.description = description;

    }
    public MovieList(String name, String description,String coverImageUrl){
        this.name = name;
        this.description = description;
        this.coverImageUrl = coverImageUrl;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MovieList )) return false;
        return id != null && id.equals(((MovieList) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
