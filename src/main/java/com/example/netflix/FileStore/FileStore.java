package com.example.netflix.FileStore;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.example.netflix.bucket.BucketName;
import com.example.netflix.dto.FileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {


     private final AmazonS3 s3;

     @Autowired
    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path, String fileName,
                        MultipartFile file,
//                     Optional<Map<String, String>> optionalMetaData,
                     InputStream inputStream) {
        ObjectMetadata metadata = new ObjectMetadata();
//        --------------------
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
//        --------------------
//        optionalMetaData.ifPresent(map -> {
//            if (!map.isEmpty())
//                map.forEach(metadata::addUserMetadata);
//        });
        try {
            s3.putObject(path, fileName, inputStream, metadata);
        } catch (AmazonServiceException e) {
            throw new IllegalStateException(String.format("Failed to store file to s3 %s", e));
        }
    }

    public byte[] download(String path,String key) {
         try{
            S3Object object = s3.getObject(path,key);
            return IOUtils.toByteArray(object.getObjectContent());
         }catch (AmazonServiceException | IOException e){
             throw new IllegalStateException("Failed to download file to s3: "+e);
         }
    }

    public String delete(String path,String key){
         try{
             s3.deleteObject(path,key);
             return "The file is deleted successfully";

         }catch (AmazonServiceException e){
             throw new IllegalStateException("Failed to delete file from s3: "+e);
         }
    }


    public List<Bucket> listBuckets (){
         return s3.listBuckets();
    }

}