package com.example.netflix.enums;

public enum AppUserAuthority {
    MOVIE_READ("movie:read"),
    MOVIE_WRITE("movie:write"),
    PERSON_READ("person:read"),
    PERSON_WRITE("person:write");

    private final String permission;

    AppUserAuthority(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
