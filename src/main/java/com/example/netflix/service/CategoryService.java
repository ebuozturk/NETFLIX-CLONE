package com.example.netflix.service;

import com.example.netflix.core.utilities.results.DataResult;
import com.example.netflix.core.utilities.results.Result;
import com.example.netflix.core.utilities.results.SuccessDataResult;
import com.example.netflix.core.utilities.results.SuccessResult;
import com.example.netflix.entity.Category;
import com.example.netflix.repository.CategoryRepository;
import com.example.netflix.dto.CategoryDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    public DataResult<List<CategoryDTO>> findAll(){
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOS = categories.stream().map(category -> modelMapper.map(category,CategoryDTO.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(categoryDTOS,"Categories found ");
    }

    public DataResult<CategoryDTO> findById(Long id){
        Category category = categoryRepository.findById(id)
                                .orElseThrow(()->new IllegalArgumentException(String.format("Category with id %s not found",String.valueOf(id))));
        CategoryDTO categoryDTO = modelMapper.map(category,CategoryDTO.class);
        return new SuccessDataResult<>(categoryDTO,"Category found");
    }

    public Result save(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO,Category.class);
        categoryRepository.save(category);
        return new SuccessResult("Category added successfully");
    }
}
