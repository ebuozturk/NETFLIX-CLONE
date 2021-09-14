package com.example.netflix.lists;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieListRequest {

    private String name;
    private String description;
    private String coverImageUrl;
    private String user_id;

}
