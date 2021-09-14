package com.example.netflix.Controller;


import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.dto.MovieListWithMoviesAndUserDTO;
import com.example.netflix.repository.MovieRepository;
import com.example.netflix.service.MovieListService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movielist")
@CrossOrigin("*")
public class MovieListController {
    @Autowired
    private MovieListService movieListService;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/id={listId}")
    public DataResult<MovieListWithMoviesAndUserDTO> getMovieListById(@PathVariable("listId") String listId){

        return movieListService.findById(Long.parseLong(listId));
    }

    @GetMapping("{listId}/addMovieToList={movieId}")
    public DataResult<MovieListWithMoviesAndUserDTO> addMovieToMovieList(@PathVariable("listId") String listId, @PathVariable("movieId") String movieId){
//
//        MovieListDTO movieListDTO = movieListService.findById(Long.parseLong(listId));
//        Movie movie = new Movie();
//        movie = movieRepository.findById(Long.parseLong(movieId)).get();
//
//        if(!movieListDTO.getMovies().contains(modelMapper.map(movie, MovieForPersonDTO.class))){
//            movieListDTO.getMovies().add(modelMapper.map(movie, MovieForPersonDTO.class));
//            return movieListService.save(movieListDTO);
//        }
//        movieListDTO.getMovies().remove(movie);
//        return movieListService.save(movieListDTO);
        return  movieListService.addMovieToMovieList(Long.parseLong(listId),Long.parseLong(movieId));

    }
    @GetMapping("/search={search}")
    public DataResult<List<MovieListWithMoviesAndUserDTO>> getMovieListBySearch(@PathVariable("search") String search){

        return movieListService.findByNameContainingIgnoreCase(search);
    }

    @PostMapping
    public DataResult<MovieListWithMoviesAndUserDTO> saveNewList(@RequestBody MovieListWithMoviesAndUserDTO movieListWithMoviesAndUserDTO){

        return movieListService.save(movieListWithMoviesAndUserDTO);
    }


}
