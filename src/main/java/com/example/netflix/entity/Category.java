package com.example.netflix.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Category {

    @Id
    @SequenceGenerator(name = "category_sequence", sequenceName = "category_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_sequence")
    private Long id;
    private String name;
    private String description;

    @ManyToMany(mappedBy = "categories")
    private Set<Movie> movies =  new HashSet<>();

    public Category(String name) {
        this.name = name;
    }

    public Category(String name, String description){
        this.name=name;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
