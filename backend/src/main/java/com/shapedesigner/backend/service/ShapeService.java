package com.shapedesigner.backend.service;

import com.shapedesigner.backend.dto.ShapeRequest;
import com.shapedesigner.backend.dto.ShapeResponse;

import java.util.List;

public interface ShapeService {

    ShapeResponse create(ShapeRequest request);

    List<ShapeResponse> getAll();

    ShapeResponse getById(Long id);

    ShapeResponse update(Long id, ShapeRequest request);

    void delete(Long id);
}
