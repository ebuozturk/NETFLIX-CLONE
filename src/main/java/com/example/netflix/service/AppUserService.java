package com.example.netflix.service;

import com.example.netflix.FileStore.FileStore;
import com.example.netflix.bucket.BucketName;
import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.Result;
import com.example.netflix.core.utilities.results.SuccessDataResult;
import com.example.netflix.core.utilities.results.SuccessResult;
import com.example.netflix.dto.AppUserDTO;
import com.example.netflix.entity.AppUser;
import com.example.netflix.repository.AppUserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.http.entity.ContentType.*;
@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FileStore fileStore;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return appUserRepository.findByUsername(username)
        return appUserRepository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException(String.format("User with username %s not found!",username)));
    }
    public UserDetails loadUserByEmail(String email){
        return appUserRepository.findByEmail(email)
                        .orElseThrow(()->new UsernameNotFoundException(String.format("User with email %s not found!",email)));
    }
    public DataResult<List<AppUserDTO>> getAllUsers(){
        List<AppUser> appUsers = appUserRepository.findAll();
        List<AppUserDTO> appUserDTOS = appUsers.stream().map(appUser ->modelMapper.map(appUser,AppUserDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(appUserDTOS,"Users listed");
    }

    public DataResult<AppUserDTO> findById(Long id){
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException(String.format("User with id %s not found",String.valueOf(id))));

        AppUserDTO appUserDTO = modelMapper.map(appUser,AppUserDTO.class);
        return new SuccessDataResult<>(appUserDTO,"User found");
    }

    public DataResult<AppUserDTO> save(AppUserDTO appUserDTO){
        AppUser appUser = modelMapper.map(appUserDTO,AppUser.class);
        appUserDTO = modelMapper.map(appUserRepository.save(appUser),AppUserDTO.class);
       return new SuccessDataResult<>(appUserDTO,"User saved");
    }
    public Result register(AppUser appUser){
        appUserRepository.save(appUser);
        return new SuccessResult("User saved");
    }

    public DataResult<AppUserDTO> findByUsername(String username){
        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(()-> new IllegalArgumentException(String.format("User with username %s not found",username)));

        AppUserDTO appUserDTO = modelMapper.map(appUser,AppUserDTO.class);
        return new SuccessDataResult<>(appUserDTO,"User found");
    }

    public DataResult<AppUserDTO> findByEmail(String email){
        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException(String.format("User with email %s not found",email)));

        AppUserDTO appUserDTO = modelMapper.map(appUser,AppUserDTO.class);
        return new SuccessDataResult<>(appUserDTO,"User found");
    }


    public void uploadUserProfileImage(Long userId, MultipartFile file) {

        if(file.isEmpty()){
            throw new IllegalStateException("Cannot upload empty file ");
        }

        if(!Arrays.asList(IMAGE_JPEG.getMimeType(), IMAGE_PNG.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("File must be an image");
        }

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(()->{
           return new IllegalStateException("The user with "+userId+" not exist!");
        });


        Map<String,String> metadata =  new HashMap<>();
//        metadata.put("Content-Type",file.getContentType());
//        metadata.put("Content-Length",String.valueOf(file.getSize()));

        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(),user.getId());
        String fileName = String.format("%s-%s",file.getOriginalFilename(), UUID.randomUUID());

        try{
            fileStore.save(path,
                    fileName,
//                    Optional.of(metadata),
                    file,
                    file.getInputStream());
            user.setImageUrl(fileName);
            appUserRepository.save(user);
        }catch (IOException e){
            throw new IllegalStateException(e);
        }
    }

    public byte[] downloadUserProfileImage(Long userId) {
        AppUser user = appUserRepository.findById(userId)
                        .orElseThrow(()->{
                            return new IllegalStateException("The user with "+userId+" not exist!");
                        });
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                user.getId());
//       return Optional.of(user.getImageUrl())
//               .map((key)->fileStore.download(path,key))
//                .orElse(new byte[0]);
       return fileStore.download(path,user.getImageUrl());


    }
}
