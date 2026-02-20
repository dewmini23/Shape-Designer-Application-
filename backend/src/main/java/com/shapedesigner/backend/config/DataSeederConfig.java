package com.shapedesigner.backend.config;

import com.shapedesigner.backend.entity.Shape;
import com.shapedesigner.backend.entity.ShapeType;
import com.shapedesigner.backend.repository.ShapeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataSeederConfig {

    @Bean
    public CommandLineRunner initDatabase(ShapeRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Default Shapes
                Map<String, Object> rectData = new HashMap<>();
                rectData.put("width", 100);
                rectData.put("height", 100);
                repository.save(new Shape("Default Rectangle", ShapeType.RECTANGLE, rectData));

                Map<String, Object> circleData = new HashMap<>();
                circleData.put("radius", 50);
                repository.save(new Shape("Default Circle", ShapeType.CIRCLE, circleData));

                Map<String, Object> triangleData = new HashMap<>();
                triangleData.put("base", 100);
                triangleData.put("height", 80);
                repository.save(new Shape("Default Triangle", ShapeType.TRIANGLE, triangleData));
            }
        };
    }
}
