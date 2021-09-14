package com.example.netflix.Controller;

import com.amazonaws.services.s3.model.Bucket;
import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.Result;
import com.example.netflix.dto.CategoryDTO;
import com.example.netflix.dto.MovieDTO;
import com.example.netflix.dto.MoviePostRequest;
import com.example.netflix.entity.Category;
import com.example.netflix.entity.Movie;
import com.example.netflix.entity.Person;
import com.example.netflix.repository.CategoryRepository;
import com.example.netflix.dto.MovieAllDetailsDTO;
import com.example.netflix.service.MovieService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.embedded.ConnectionProperties;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/movie")
@CrossOrigin("*")
public class MovieController {

    @Autowired
    private MovieService movieService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    Gson gson = new GsonBuilder()
            .setLenient()
            .create();


    @GetMapping("/search={search}")
    public DataResult<List<MovieAllDetailsDTO>> getMoviesBySearch(@PathVariable("search") String search){
        log.info(search+" result ->");

        return movieService.getMoviesBySearch(search);
    }

    @GetMapping
    public DataResult<List<MovieAllDetailsDTO>> getAll(){
        return movieService.findAll();
    }

    @GetMapping("{id}")
    public DataResult<MovieAllDetailsDTO> getMovie(@PathVariable("id") String id){
        Long movieId = Long.parseLong(id);
        return movieService.findById(movieId);
    }

    @GetMapping(value = {"/genre/","/genre/{categoryIds}"})
    public ResponseEntity<DataResult<List<MovieAllDetailsDTO>>> filterByCategory(@PathVariable Optional<String> categoryIds){

        if(!categoryIds.isPresent()) {
           return ResponseEntity.ok(movieService.findAll());
        }
        String[] ids=categoryIds.get().split(",");
        List<Category> categories = new ArrayList<>();
        for(String id : ids){
            categories.add(categoryRepository.findById(Long.parseLong(id)).get());
        }
        return ResponseEntity.ok(movieService.findByCategoriesIn(categories));
    }

    @PostMapping(
            path="/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> uploadMovie(
            @RequestPart("movie") MovieAllDetailsDTO movie,
            @RequestPart("imageFile") MultipartFile imageFile,
            @RequestPart("logoFile") MultipartFile logoFile,
            @RequestPart("detailPosterFile") MultipartFile detailPosterFile,
            @RequestPart("videoFile") MultipartFile videoFile
            ){

        return ResponseEntity.ok(movieService.save(movie,imageFile,logoFile,detailPosterFile,videoFile));
    }
    @PostMapping(
            path="/update/{movieId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateMovie(
            @RequestPart("movie") MovieAllDetailsDTO movie,
            @RequestPart(value = "imageFile",required = false) MultipartFile imageFile,
            @RequestPart(value = "logoFile",required = false) MultipartFile logoFile,
            @RequestPart(value = "detailPosterFile",required = false) MultipartFile detailPosterFile,
            @RequestPart(value = "videoFile",required = false) MultipartFile videoFile
    ){

        return ResponseEntity.ok(movieService.update(movie,imageFile,logoFile,detailPosterFile,videoFile));
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){

        return ResponseEntity.ok(movieService.delete(id));
    }

    @GetMapping("/randomMovie")
    public ResponseEntity<?> randomMovie(){
        return ResponseEntity.ok(movieService.getRandomMovie());
    }
    @GetMapping("/{movieId}/image/poster/download")
    public byte[] downloadMovieImage(@PathVariable("movieId") Long movieId){
        return movieService.downloadMovieImage(movieId);
    }
    @GetMapping("/{movieId}/image/detailPoster/download")
    public byte[] downloadMovieDetailPoster(@PathVariable("movieId") Long movieId){
        return movieService.downloadMovieDetailImage(movieId);
    }
    @GetMapping("/{movieId}/image/logo/download")
    public byte[] downloadMovieLogo(@PathVariable("movieId") Long movieId){
        return movieService.downloadMovieLogoImage(movieId);
    }
    @GetMapping("/{movieId}/video/download")
    public byte[] downloadMovieVideo(@PathVariable("movieId") Long movieId){
        return movieService.downloadMovieVideo(movieId);
    }



}
