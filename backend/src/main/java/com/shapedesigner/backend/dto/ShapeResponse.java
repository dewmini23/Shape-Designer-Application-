package com.shapedesigner.backend.dto;

import com.shapedesigner.backend.entity.ShapeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShapeResponse {

    private Long id;
    private String name;
    private ShapeType type;
    private Map<String, Object> dimensionData;
    private LocalDateTime createdAt;
}
