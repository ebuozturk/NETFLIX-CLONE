package com.example.netflix.repository;

import com.example.netflix.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {

    @Query(value = "SELECT p FROM Person p LEFT JOIN FETCH p.movies LEFT JOIN FETCH p.qualities where p.id=?1" )
    Optional<Person> findPersonByIdWithMovies(Long id);


    @Query(value="From Person p left join fetch p.movies")
    List<Person> findAllPerson();



}
