package com.example.netflix.registration;

import com.example.netflix.entity.AppUser;
import com.example.netflix.enums.AppUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

//    private String firstName;
//    private String lastName;
//    private String username;
    private String email;
    private String password;

    public AppUser toUser(PasswordEncoder passwordEncoder){
//        return new AppUser(firstName,lastName,username,email,passwordEncoder.encode(password), AppUserRole.USER);
        return new AppUser(email,passwordEncoder.encode(password), AppUserRole.USER);
    }
}
