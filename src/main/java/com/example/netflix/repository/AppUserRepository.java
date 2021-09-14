package com.example.netflix.repository;

import com.example.netflix.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface AppUserRepository extends JpaRepository<AppUser,Long> {

    @Query(value="SELECT DISTINCT u FROM AppUser u LEFT JOIN FETCH u.favourites uf LEFT JOIN FETCH u.lists ul WHERE u.username= ?1")
    Optional<AppUser> findByUsername(String username);

    @Query(value="SELECT DISTINCT u FROM AppUser u LEFT JOIN FETCH u.favourites uf LEFT JOIN FETCH u.lists ul WHERE u.username= ?1")
    Optional<AppUser> findAppUserWithListsByUsername(String username);


    Optional<AppUser> findByEmail(String email);
}
