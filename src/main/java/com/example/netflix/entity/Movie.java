package com.example.netflix.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@Data
public class Movie {

        @Id
        @SequenceGenerator(name = "movie_sequence", sequenceName = "movie_sequence",allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_sequence")
        private Long id;
        @NotNull
        @NotBlank(message = "can not be null")
        @NotEmpty(message = "not empty")
        private String name;
        private String imdb;
        @Column(length = 14300)
        private String storyline;
        @Column(length = 14300)
        private String imageUrl;
        @Column(length = 14300)
        private String videoUrl;
        private String logoUrl;
        private String detailPosterUrl;
        private String releaseYear;
        private String ageRestriction;
        private String length;

        
        @ManyToMany
        @JoinTable(
                name="movie_category",
                joinColumns = @JoinColumn(name="movie_id"),
                inverseJoinColumns = @JoinColumn(name="category_id")
        )
        @Column(nullable = true)
        private List<Category> categories = new ArrayList<>();

        @ManyToMany
        @JoinTable(
                name="movie_cast",
                joinColumns = @JoinColumn(name="movie_id"),
                inverseJoinColumns = @JoinColumn(name="person_id")
        )
        @Column(nullable = true)
        private Set<Person> cast = new HashSet<>();

        @ManyToMany
        @JoinTable(
                name="movie_director",
                joinColumns = @JoinColumn(name="movie_id"),
                inverseJoinColumns = @JoinColumn(name="person_id")
        )
        @Column(nullable = true)
        private Set<Person> directors = new HashSet<>();

        @ManyToMany(mappedBy = "movies")
        private Set<MovieList> movieLists = new HashSet<>();

    public Movie(String name) {
        this.name = name;
    }

    public Movie(@NotBlank(message = "can not be null") @NotEmpty(message = "not empty") String name, String imdb, String storyline, String imageUrl, String videoUrl, String logoUrl, String detailPosterUrl, String releaseYear, String ageRestriction, String length) {
        this.name = name;
        this.imdb = imdb;
        this.storyline = storyline;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.logoUrl = logoUrl;
        this.detailPosterUrl = detailPosterUrl;
        this.releaseYear = releaseYear;
        this.ageRestriction = ageRestriction;
        this.length = length;
    }

    public Movie(String name, String imdb, String storyline, String imageUrl, String videoUrl)
    {
        this.name=name;
        this.imdb=imdb;
        this.storyline=storyline;
        this.imageUrl=imageUrl;
        this.videoUrl=videoUrl;

    }
        public Movie(String name,String imdb,String storyline,String imageUrl,String videoUrl, List<Category> categories)
        {
            this.name=name;
            this.imdb=imdb;
            this.storyline=storyline;
            this.imageUrl=imageUrl;
            this.videoUrl=videoUrl;
            this.categories=categories;
        }



    public void addCategory(Category category){
        this.categories.add(category);
        category.getMovies().add(this);
    }
    public void removeCategory(Category category){
        this.categories.remove(category);
        category.getMovies().remove(this);
    }
    public void addActor(Person person){
        this.cast.add(person);
        person.getMovies().add(this);
    }
    public void removeActor(Person person){
        this.cast.remove(person);
        person.getMovies().remove(this);
    }
    public void addDirector(Person person){
        this.directors.add(person);
    }
    public void removeDirector(Person person){
        this.directors.remove(person);
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Movie )) return false;
        return id != null && id.equals(((Movie) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }


}
