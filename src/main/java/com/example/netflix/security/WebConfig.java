package com.example.netflix.security;


import com.example.netflix.enums.AppUserRole;
import com.example.netflix.jwt.JwtRequestFilter;
import com.example.netflix.repository.AppUserRepository;
import com.example.netflix.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AppUserService appUserService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override //Authentication işlemi için gerekli olan servisi ayarlıyoruz
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserService).passwordEncoder(passwordEncoder);
    }

    private static final String[] AUTH_WHITELIST = {
            // -- Swagger UI v2
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
            // other public endpoints of your API may be appended to this array
    };

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,
                        "/api/person/upload",
                        "/api/person/update/*",
                        "/api/person/delete/*",
                        "/api/movie/upload",
                        "/api/movie/update/*",
                        "/api/movie/delete/*",
                        "/api/genre/upload"
                        ).hasAuthority(AppUserRole.ADMIN.name())
                .antMatchers(AUTH_WHITELIST).permitAll()
                .antMatchers("/api/user/authenticate","/api/registration","/api/user/checkToken","/api/*/*/image/download","/api/*/*/image/*/download","/api/*/*/video/download").permitAll()
                .anyRequest().authenticated();


    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
       return super.authenticationManagerBean();
    }

}
