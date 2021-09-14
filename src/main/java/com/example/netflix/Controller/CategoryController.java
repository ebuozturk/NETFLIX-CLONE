package com.example.netflix.Controller;


import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.dto.CategoryDTO;
import com.example.netflix.entity.Category;
import com.example.netflix.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;

@RestController
@RequestMapping("/api/genre")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public DataResult<List<CategoryDTO>> getCategories(){

        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public DataResult<CategoryDTO> getCategoryById(@PathVariable("id") String id){
        return categoryService.findById(Long.parseLong(id));
    }
    @PostMapping("/upload")
    public ResponseEntity<?> postCategory(@RequestBody CategoryDTO categoryDTO){
        return ResponseEntity.ok(categoryService.save(categoryDTO));
    }

}
