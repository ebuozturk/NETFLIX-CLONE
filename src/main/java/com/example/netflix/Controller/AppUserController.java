package com.example.netflix.Controller;

import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.ErrorResult;
import com.example.netflix.core.utilities.results.SuccessDataResult;
import com.example.netflix.core.utilities.results.SuccessResult;
import com.example.netflix.dto.AppUserDTO;
import com.example.netflix.dto.MovieAllDetailsDTO;
import com.example.netflix.jwt.AuthenticationRequest;
import com.example.netflix.jwt.AuthenticationResponse;
import com.example.netflix.jwt.CheckValidRequest;
import com.example.netflix.jwt.JwtUtil;
import com.example.netflix.service.AppUserService;
import com.example.netflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class AppUserController {

    @Autowired
    private MovieService movieService;
    @Autowired
    private AppUserService appUserService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/user={userid}/addFavourite={movieid}")
    public List<MovieAllDetailsDTO> addMovieToFavourites(@PathVariable("userid") String userId, @PathVariable("movieid") String movieId){
//        Long movId=Long.parseLong(movieId);
//        Long uId = Long.parseLong(userId);
//        AppUserDTO appUserDTO = new AppUserDTO();
//        appUserDTO.setId(uId);
//        MovieDTO movieDTO = new MovieDTO();
//        movieDTO.setId(movId);
//        appUserDTO.getFavourites().add(movieDTO);
//        if(!appUserDTO.getFavourites().contains(movieDTO)){
//            appUserDTO.getFavourites().add(movieDTO);
//            appUserService.save(appUserDTO);
//            return appUserService.findById(Long.parseLong(userId)).getFavourites();
//        }
//        appUserDTO.getFavourites().remove(movieDTO);
//        appUserService.save(appUserDTO);
//        return appUserService.findById(Long.parseLong(userId)).getFavourites();
        return new ArrayList<MovieAllDetailsDTO>();
    }

    @GetMapping("/id={id}")
    public DataResult<AppUserDTO> getUser(@PathVariable("id") String id){

        return appUserService.findById(Long.parseLong(id));
    }

    @GetMapping("/user={username}")
    public DataResult<AppUserDTO> getUserByUsername(@PathVariable("username") String username){
        return appUserService.findByUsername(username);
    }
    @GetMapping("/email={email}")
    public DataResult<AppUserDTO> getUserByEmail(@PathVariable("email") String email){
        return appUserService.findByEmail(email);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
//        UserDetails userDetails = appUserService.loadUserByUsername(request.getUsername());
        UserDetails userDetails = appUserService.loadUserByEmail(request.getUsername());
        final String jwt  = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new SuccessDataResult<>(new AuthenticationResponse(jwt),"Sign in successful!"));
    }

    @PostMapping("/checkToken")
    public ResponseEntity<?> checkTokenIfValid(@RequestBody CheckValidRequest request){
        UserDetails userDetails = appUserService.loadUserByUsername(request.getUsername());
        if(jwtUtil.validateToken(request.getToken(),userDetails)){
            return ResponseEntity.ok(new SuccessResult("Token is valid"));
        }
        return ResponseEntity.ok(new ErrorResult("token is not valid"));
    }

    @GetMapping("/{userId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userId") Long userId){
        return appUserService.downloadUserProfileImage(userId);
    }

    @PostMapping(
            path = "{userId}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
        )
    public void uploadUserProfileImage(@PathVariable("userId") String userId,
                                       @RequestParam("file")MultipartFile profileImageFile){
        appUserService.uploadUserProfileImage(Long.parseLong(userId),profileImageFile);
    }




}



