package com.example.netflix.service;


import com.example.netflix.FileStore.FileStore;
import com.example.netflix.bucket.BucketName;
import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.Result;
import com.example.netflix.core.utilities.results.SuccessDataResult;
import com.example.netflix.core.utilities.results.SuccessResult;
import com.example.netflix.dto.PersonWithMoviesDTO;
import com.example.netflix.dto.PersonDTO;
import com.example.netflix.entity.Person;
import com.example.netflix.repository.PersonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FileStore fileStore;

    public DataResult<PersonDTO> save(PersonDTO personDTO, MultipartFile imageFile) throws ParseException {
//        personDTO.setQualities(new HashSet<>(personDTO.getQualities()));
          Person person =modelMapper.map(personDTO,Person.class);
          person.setBirthDate(strToCal(personDTO.getBirthDate()));
          person = personRepository.save(person);
       return new SuccessDataResult<>(savePersonWithImage(person,imageFile),String.format("%s added successfully!",personDTO.getName()));
    }
    public DataResult<PersonDTO> update(PersonDTO personDTO, MultipartFile imageFile) throws ParseException {
        Person person= modelMapper.map(personDTO,Person.class);
        return save(personDTO,imageFile);
    }
    public DataResult<PersonDTO> update(PersonDTO personDTO) throws ParseException {
        Person person= modelMapper.map(personDTO,Person.class);
        person.setBirthDate(strToCal(personDTO.getBirthDate()));
        return new SuccessDataResult<>(modelMapper.map(personRepository.save(person),PersonDTO.class),String.format("%s updated successfully!",person.getName()));
    }
    public DataResult<PersonWithMoviesDTO> findPersonByIdWithMovies(Long id){
        Person person = personRepository.findPersonByIdWithMovies(id)
                .orElseThrow(()-> new IllegalArgumentException(String.format("Person with id %s not found",String.valueOf(id))));
        PersonWithMoviesDTO personDTO = modelMapper.map(person, PersonWithMoviesDTO.class);
        return new SuccessDataResult<PersonWithMoviesDTO>(personDTO,"Person has been found");
    }

    public DataResult<List<PersonDTO>> findAllPersons(){
        List<Person> personList = personRepository.findAll();
        List<PersonDTO> personDTOList = personList
                    .stream().map((person)->modelMapper.map(person, PersonDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(personDTOList,"Persons Found");
    }

    public Result deleteById(Long id){
        Person person =  personRepository.findById(id).orElseThrow(
                ()->{
                    throw new IllegalStateException(String.format("Person with %s id not exists!",id));
                }
        );
        String name = person.getName();
        personRepository.delete(person);
        String path = String.format("%s/%s",
                BucketName.PERSON_IMAGE.getBucketName(),person.getId());
        fileStore.delete(path,person.getImageUrl());
        return new SuccessResult(String.format("%s is deleted successfully!",name));
    }


    public byte[] downloadPersonImage(Long personId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(()->{
                    return new IllegalStateException("The person with "+personId+" not exist!");
                });
        String path = String.format("%s/%s",
                BucketName.PERSON_IMAGE.getBucketName(),
                person.getId());

        return fileStore.download(path,person.getImageUrl());
    }

    public PersonDTO savePersonWithImage(Person person, MultipartFile imageFile){
        String imagePath = String.format("%s/%s", BucketName.PERSON_IMAGE.getBucketName(),person.getId());
        String imageFileName = String.format("%s-%s",imageFile.getOriginalFilename(), UUID.randomUUID());
        String oldImageKey = person.getImageUrl();
        try{
            fileStore.save(imagePath,
                    imageFileName,
//                    Optional.of(metadata),
                    imageFile,
                    imageFile.getInputStream());

            person.setImageUrl(imageFileName);

            person = personRepository.save(person);
            if(oldImageKey != null)
                fileStore.delete(imagePath,oldImageKey);
            return modelMapper.map(person, PersonDTO.class);
        }catch (IOException e){
            throw new IllegalStateException(e);
        }
    }
    public Calendar strToCal(String date) throws ParseException {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        cal.setTime(sdf.parse(date));
        return cal;
    }
}
