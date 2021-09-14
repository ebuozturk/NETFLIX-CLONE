package com.example.netflix;

import com.example.netflix.entity.Category;
import com.example.netflix.entity.Person;
import com.example.netflix.repository.CategoryRepository;
import com.example.netflix.entity.Movie;
import com.example.netflix.repository.MovieRepository;
import com.example.netflix.repository.AppUserRepository;
import com.example.netflix.repository.MovieListRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.Set;

@SpringBootTest
class NetflixApplicationTests {

	@Autowired
	MovieRepository movieRepository;
	@Autowired
	AppUserRepository appUserRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	MovieListRepository movieListRepository;

	@Test
	void contextLoads() {
	}

	@Test
	public void testFetches(){


	}

}
