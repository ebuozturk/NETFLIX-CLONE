package com.example.netflix.entity;

import com.example.netflix.enums.AppUserRole;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
@NoArgsConstructor
@Data
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated
    private AppUserRole role;
    private String imageUrl;
    private boolean expired=false;
    private boolean locked=false;
    private boolean enabled=true;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="user_favourites",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="movie_id")
    )
    @LazyCollection(LazyCollectionOption.TRUE)
    private Set<Movie> favourites = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user", orphanRemoval = true)
    private List<MovieList> lists = new ArrayList<>();

    public void addList(MovieList movieList) {
        lists.add(movieList);
        movieList.setUser(this);
    }

    public void removeList(MovieList movieList) {
        lists.remove(movieList);
        movieList.setUser(null);
    }

    public AppUser(Long id, String username, Set<Movie> favourites) {
        this.id = id;
        this.username = username;
        this.favourites = favourites;
    }

    public AppUser(String email, String password,AppUserRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public AppUser(Long id, String firstName, String lastName, String username, String email, String password, AppUserRole role, boolean expired, boolean locked, boolean enabled, Set<Movie> favourites) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.expired = expired;
        this.locked = locked;
        this.enabled = enabled;
        this.favourites = favourites;
    }

    public AppUser(String firstName, String lastName, String username, String email, String password, AppUserRole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public AppUser(String firstName, String lastName, String username, String email, String password, AppUserRole role,String imageUrl) {
        this(firstName,lastName,username,email,password,role);
        this.imageUrl = imageUrl;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
//        return username;
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}

