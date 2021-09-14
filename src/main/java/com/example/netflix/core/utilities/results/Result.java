package com.example.netflix.core.utilities.results;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class Result {
    private boolean success;
    private String message;

    public Result(boolean success){
        this.success = success;
    }

    public Result(boolean success, String message) {
        this(success);
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
