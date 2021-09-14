package com.example.netflix.repository;
import com.example.netflix.entity.Category;
import com.example.netflix.entity.Movie;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {

    @Query
    List<Movie> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    @Query(value = "SELECT DISTINCT m FROM Movie m LEFT JOIN FETCH m.categories c where m.id = ?1")
    Optional<Movie> findByIdWithCategories(Long id);

    @Query(value = "SELECT DISTINCT m FROM Movie m LEFT JOIN FETCH m.categories c LEFT JOIN FETCH m.cast ct LEFT JOIN FETCH m.directors d where m.id = :id ")
    Optional<Movie> findByIdWithCategoriesAndCastAndDirectors(@Param("id") Long id);

    @Query(value = "SELECT DISTINCT m FROM Movie m LEFT JOIN FETCH m.categories c LEFT JOIN FETCH m.cast ct LEFT JOIN FETCH m.directors d LEFT JOIN FETCH m.movieLists ml where m.id = :id ")
    Optional<Movie> findByIdWithCategoriesAndCastAndDirectorsAndMovieLists(@Param("id") Long id);

    List<Movie> findByCategoriesIn(List<Category> categoryList);

    @Query("select m.id from Movie m")
    List<Object> getMovieId();



}
