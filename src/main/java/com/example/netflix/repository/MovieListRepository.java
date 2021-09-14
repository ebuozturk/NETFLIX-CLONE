package com.example.netflix.repository;

import com.example.netflix.entity.MovieList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface MovieListRepository extends JpaRepository<MovieList,Long> {

    List<MovieList> findByNameContainingIgnoreCase(String name);

    @Query(value="SELECT DISTINCT ml FROM MovieList ml LEFT JOIN FETCH ml.movies LEFT JOIN FETCH ml.user")
    List<MovieList> findAll();

    @Query(value="SELECT DISTINCT ml FROM MovieList ml LEFT JOIN FETCH ml.movies LEFT JOIN FETCH ml.user WHERE ml.id= :id")
    Optional<MovieList> findById(@Param("id") Long id);


}
