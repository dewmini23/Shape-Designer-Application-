package com.shapedesigner.backend.dto;

import com.shapedesigner.backend.entity.ShapeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShapeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Type is required")
    private ShapeType type;

    @NotNull(message = "Dimension data is required")
    private Map<String, Object> dimensionData;
}
