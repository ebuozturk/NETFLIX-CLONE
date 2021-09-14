package com.example.netflix.service;

import com.example.netflix.FileStore.FileStore;
import com.example.netflix.bucket.BucketName;
import com.example.netflix.core.utilities.results.*;
import com.example.netflix.dto.MovieDTO;
import com.example.netflix.dto.MovieDetailsDTO;
import com.example.netflix.entity.Category;
import com.example.netflix.dto.MovieAllDetailsDTO;
import com.example.netflix.entity.Movie;
import com.example.netflix.repository.MovieRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FileStore fileStore;

    public DataResult<MovieAllDetailsDTO> save (MovieAllDetailsDTO movie1
            , MultipartFile imageFile, MultipartFile logoFile, MultipartFile detailPosterFile, MultipartFile videoFile
    ){
        Movie movie = new Movie();

        if(movie1.getId() == null)
            movie = movieRepository.save(modelMapper.map(movie1,Movie.class));
        else {
            movie = movieRepository.findByIdWithCategoriesAndCastAndDirectorsAndMovieLists(movie1.getId()).get();
            if(movie != null) {

                movie1.setImageUrl(movie.getImageUrl());
                movie1.setDetailPosterUrl(movie.getDetailPosterUrl());
                movie1.setLogoUrl(movie.getLogoUrl());
                movie1.setVideoUrl(movie.getVideoUrl());
                movie = modelMapper.map(movie1, Movie.class);//STACKOVERFLOW
            }
        }
        if(imageFile != null) {
            String imagePath = String.format("%s/%s", BucketName.MOVIE_IMAGE.getBucketName(), movie.getId());
            String imageFileName = String.format("%s-%s", imageFile.getOriginalFilename(), UUID.randomUUID());
            fileSave(imagePath,imageFileName,imageFile);
            movie.setImageUrl(imageFileName);
        }
        if(logoFile != null) {
            String logoPath = String.format("%s/%s", BucketName.MOVIE_IMAGE.getBucketName(), movie.getId());
            String logoFileName = String.format("%s-%s", logoFile.getOriginalFilename(), UUID.randomUUID());
            fileSave(logoPath,logoFileName,logoFile);
            movie.setLogoUrl(logoFileName);

        }
        if(detailPosterFile != null) {
            String detailPosterFilePath = String.format("%s/%s", BucketName.MOVIE_IMAGE.getBucketName(), movie.getId());
            String detailPosterFileName = String.format("%s-%s", detailPosterFile.getOriginalFilename(), UUID.randomUUID());
            fileSave(detailPosterFilePath,detailPosterFileName,detailPosterFile);
            movie.setDetailPosterUrl(detailPosterFileName);

        }
        if(videoFile != null) {
            String videoFilePath = String.format("%s/%s", BucketName.MOVIE_VIDEO.getBucketName(), movie.getId());
            String videoFileName = String.format("%s-%s", videoFile.getOriginalFilename(), UUID.randomUUID());
            fileSave(videoFilePath,videoFileName,videoFile);
            movie.setVideoUrl(videoFileName);
        }

        return new SuccessDataResult<>(modelMapper.map(movieRepository.save(movie),MovieAllDetailsDTO.class));


    }
    public byte[] downloadMovieImage(Long movieId) {
       Movie movie = movieRepository.findById(movieId)
                .orElseThrow(()->{
                    return new IllegalStateException("The movie with "+movieId+" not exist!");
                });
        String path = String.format("%s/%s",
                BucketName.MOVIE_IMAGE.getBucketName(),
                movie.getId());

        return fileStore.download(path,movie.getImageUrl());
    }
    public byte[] downloadMovieDetailImage(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(()->{
                    return new IllegalStateException("The movie with "+movieId+" not exist!");
                });
        String path = String.format("%s/%s",
                BucketName.MOVIE_IMAGE.getBucketName(),
                movie.getId());
        return fileStore.download(path,movie.getDetailPosterUrl());

    }    public byte[] downloadMovieLogoImage(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(()->{
                    return new IllegalStateException("The movie with "+movieId+" not exist!");
                });
        String path = String.format("%s/%s",
                BucketName.MOVIE_IMAGE.getBucketName(),
                movie.getId());
        return fileStore.download(path,movie.getLogoUrl());
    }
    public byte[] downloadMovieVideo(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(()->{
                    return new IllegalStateException("The movie with "+movieId+" not exist!");
                });
        String path = String.format("%s/%s",
                BucketName.MOVIE_VIDEO.getBucketName(),
                movie.getId());
        return fileStore.download(path,movie.getVideoUrl());
    }


    public DataResult<MovieAllDetailsDTO> findById(Long id){
        Movie movie = movieRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException(String.format("Movie with id %s not found",String.valueOf(id))));
        MovieAllDetailsDTO movieAllDetailsDTO = modelMapper.map(movie, MovieAllDetailsDTO.class);
        return new SuccessDataResult<>(movieAllDetailsDTO,"Movie found");
    }



    public DataResult<List<MovieAllDetailsDTO>> findAll(){
        List<Movie> movies = movieRepository.findAll();
        List<MovieAllDetailsDTO> movieAllDetailsDTOS = movies.stream().map(movie -> modelMapper.map(movie, MovieAllDetailsDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(movieAllDetailsDTOS,"Movies found");
    }

    public DataResult<List<MovieAllDetailsDTO>> findByCategoriesIn(List<Category> categories){
            List<Movie> movies =movieRepository.findByCategoriesIn(categories);
            List<MovieAllDetailsDTO> movieAllDetailsDTOList = movies.stream().map(movie -> modelMapper.map(movie, MovieAllDetailsDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(movieAllDetailsDTOList,"Movie found");
    }

    public DataResult<List<MovieAllDetailsDTO>> getMoviesBySearch(String search){
        List<Movie> movies = movieRepository.findByNameContainingIgnoreCaseOrderByNameAsc(search);
        List<MovieAllDetailsDTO> movieAllDetailsDTOList = movies.stream().map(movie -> modelMapper.map(movie, MovieAllDetailsDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(movieAllDetailsDTOList,"Movie found by search");
    }


    public DataResult<MovieAllDetailsDTO> update(
            MovieAllDetailsDTO movie,
            MultipartFile imageFile,
            MultipartFile logoFile,
            MultipartFile detailPosterFile,
            MultipartFile videoFile) {
        return save(movie,imageFile,logoFile,detailPosterFile,videoFile);

    }

    public void fileSave(String filePath,String fileName,MultipartFile file){
        try{
            fileStore.save(filePath,
                    fileName,
//                    Optional.of(metadata),
                    file,
                    file.getInputStream());
        }catch (IOException e){
            throw new IllegalStateException(e);
        }
    }

    public Result delete(Long id){
        Movie movie = movieRepository.findById(id).orElseThrow(()->{
            throw new IllegalStateException(String.format("Movie with %s id not exists!",id));
        });
        movieRepository.deleteById(id);
        String path = String.format("%s/%s",
                BucketName.MOVIE_IMAGE.getBucketName(),movie.getId());
        String videoPath = String.format("%s/%s",
                BucketName.MOVIE_VIDEO.getBucketName(),movie.getId());
        fileStore.delete(path,movie.getImageUrl());
        fileStore.delete(path,movie.getDetailPosterUrl());
        fileStore.delete(path,movie.getLogoUrl());
        fileStore.delete(videoPath,movie.getVideoUrl());
        return new SuccessResult(String.format("%s deleted successfully!",movie.getName()));
    }

    public DataResult<MovieDetailsDTO> getRandomMovie() {
        List<Object> objects = movieRepository.getMovieId();
        int randomNum = ThreadLocalRandom.current().nextInt(0, objects.size());
        Movie movie = movieRepository.findById((long)objects.get(randomNum)).get();
        return new SuccessDataResult<>(modelMapper.map(movie,MovieDetailsDTO.class),String.format("Random movie: %s",movie.getName()));
    }
}
