package com.example.netflix.registration;


import com.example.netflix.security.PasswordConfig;
import com.example.netflix.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin("*")
public class RegistrationController {

    @Autowired
    AppUserService appUserService;
    @Autowired
    PasswordConfig passwordConfig;

    @PostMapping
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest){

        return ResponseEntity.ok( appUserService.register(registrationRequest.toUser(passwordConfig.passwordEncoder())));
    }

}
