package com.example.netflix.advice;

import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.ErrorDataResult;
import com.example.netflix.core.utilities.results.ErrorResult;
import com.example.netflix.core.utilities.results.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationException(MethodArgumentNotValidException exceptions) {
        Map<String, String> validationErrors = new HashMap<String,String>();
        for(FieldError fieldError : exceptions.getBindingResult().getFieldErrors()){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        ErrorDataResult<Object> errors = new ErrorDataResult<Object>(validationErrors,"Validation Errors");
        return errors;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Result> illegalArgumentEx(Exception exception){

        return new ResponseEntity<Result>(new ErrorResult(exception.getMessage()),HttpStatus.EXPECTATION_FAILED);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Result> allEx(Exception ex){
//        System.out.println(ex.getMessage());
//        return new ResponseEntity<Result>(new ErrorResult(ex.getMessage()),HttpStatus.BAD_REQUEST);
//    }
    @ExceptionHandler(MissingServletRequestPartException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Result> missingServletRequestPartException(Exception ex){
        return new ResponseEntity<Result>(new ErrorResult(ex.getMessage()),HttpStatus.BAD_REQUEST);
    }


}
