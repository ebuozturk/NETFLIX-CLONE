package com.example.netflix.Controller;

import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.dto.PersonWithMoviesDTO;
import com.example.netflix.dto.PersonDTO;
import com.example.netflix.repository.MovieRepository;
import com.example.netflix.service.PersonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api/person")
@CrossOrigin("*")
public class PersonController {

    @Autowired
    PersonService personService;
    @Autowired
    MovieRepository movieService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> postPerson(
            @RequestPart("person")@Valid PersonDTO person,
            @RequestPart("imageFile")MultipartFile imageFile
            ) throws ParseException {

        return ResponseEntity.ok(personService.save(person,imageFile));
    }
    @PostMapping("/update/{personId}")
    public ResponseEntity<?> updatePerson(@RequestPart("person") PersonDTO person,
                                          @RequestPart(value = "imageFile",required = false) MultipartFile imageFile
                                          ) throws ParseException {

        if(imageFile != null)
            return ResponseEntity.ok(personService.update(person,imageFile));
        return ResponseEntity.ok(personService.update(person));
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable("id") Long id){
        return ResponseEntity.ok(personService.deleteById(id));

    }


    @GetMapping("/{personId}/image/download")
    public byte[] downloadPersonImage(@PathVariable("personId") Long personId){
        return personService.downloadPersonImage(personId);
    }
    @GetMapping("/{id}")
    public DataResult<PersonWithMoviesDTO> getPersonById(@PathVariable("id") String id){

        return  personService.findPersonByIdWithMovies(Long.parseLong(id));
    }

    @GetMapping
    public ResponseEntity<?> getAllPersons(){

        return ResponseEntity.ok(personService.findAllPersons());
    }

}
