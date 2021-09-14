package com.example.netflix.service;

import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.SuccessDataResult;
import com.example.netflix.dto.MovieDTO;
import com.example.netflix.dto.MovieListWithMoviesAndUserDTO;
import com.example.netflix.entity.Movie;
import com.example.netflix.entity.MovieList;
import com.example.netflix.repository.MovieListRepository;
import com.example.netflix.repository.MovieRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieListService {
    @Autowired
    private MovieListRepository movieListRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private ModelMapper modelMapper;


    public DataResult<MovieListWithMoviesAndUserDTO> findById(Long id){
        MovieList movieList = movieListRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException(String.format("List with id %s not found",String.valueOf(id))));
        MovieListWithMoviesAndUserDTO movieListWithMoviesAndUserDTO = modelMapper.map(movieList, MovieListWithMoviesAndUserDTO.class);
        return new SuccessDataResult<>(movieListWithMoviesAndUserDTO,"Movie found");
    }

    public DataResult<MovieListWithMoviesAndUserDTO> save(MovieListWithMoviesAndUserDTO movieListWithMoviesAndUserDTO){
        MovieList movieList1 = modelMapper.map(movieListWithMoviesAndUserDTO,MovieList.class);
        return new SuccessDataResult<>(modelMapper.map(movieListRepository.save(movieList1), MovieListWithMoviesAndUserDTO.class),"List saved");
    }
    public DataResult<List<MovieListWithMoviesAndUserDTO>> findByNameContainingIgnoreCase(String search) {
        List<MovieList> movieLists = movieListRepository.findByNameContainingIgnoreCase(search);
        List<MovieListWithMoviesAndUserDTO> movieListDTOListWithMoviesAndUser = movieLists.stream().map(movieList -> modelMapper.map(movieList, MovieListWithMoviesAndUserDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(movieListDTOListWithMoviesAndUser,"Movie found");
    }

    public DataResult<MovieListWithMoviesAndUserDTO> addMovieToMovieList(Long listId, Long movieId){

        MovieList movieList = movieListRepository.findById(listId).get();
        MovieListWithMoviesAndUserDTO movieListWithMoviesAndUserDTO = modelMapper.map(movieList, MovieListWithMoviesAndUserDTO.class);
        Movie movie = new Movie();
        movie.setId(movieId);

        if(!movieList.getMovies().contains(modelMapper.map(movie, MovieDTO.class))){
            movieList.getMovies().add(movie);
            movieListRepository.save(movieList);
             
            return new SuccessDataResult<>("Movie added to list");
        }
        movieList.getMovies().remove(movie);
        return new SuccessDataResult<>(modelMapper.map(movieListRepository.save(movieList), MovieListWithMoviesAndUserDTO.class),"Movie removed from list");

    }


}
