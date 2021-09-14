package com.example.netflix.bucket;

public enum BucketName {

    PROFILE_IMAGE("ebu-netflix/user"),
    PERSON_IMAGE("ebu-netflix/person"),
    MOVIE_IMAGE("ebu-netflix/movie/image"),
    MOVIE_VIDEO("ebu-netflix/movie/video");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
