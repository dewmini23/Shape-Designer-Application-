package com.shapedesigner.backend.service.impl;

import com.shapedesigner.backend.dto.ShapeRequest;
import com.shapedesigner.backend.dto.ShapeResponse;
import com.shapedesigner.backend.entity.Shape;
import com.shapedesigner.backend.entity.ShapeType;
import com.shapedesigner.backend.exception.InvalidShapeException;
import com.shapedesigner.backend.exception.ResourceNotFoundException;
import com.shapedesigner.backend.repository.ShapeRepository;
import com.shapedesigner.backend.service.ShapeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ShapeServiceImpl implements ShapeService {

    private final ShapeRepository shapeRepository;

    public ShapeServiceImpl(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public ShapeResponse create(ShapeRequest request) {
        validateDimensionData(request.getType(), request.getDimensionData());
        Shape shape = new Shape(request.getName(), request.getType(), request.getDimensionData());
        Shape savedShape = shapeRepository.save(shape);
        return mapToResponse(savedShape);
    }

    @Override
    public List<ShapeResponse> getAll() {
        return shapeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ShapeResponse getById(Long id) {
        Shape shape = shapeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shape not found with id: " + id));
        return mapToResponse(shape);
    }

    @Override
    public ShapeResponse update(Long id, ShapeRequest request) {
        Shape shape = shapeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shape not found with id: " + id));

        validateDimensionData(request.getType(), request.getDimensionData());

        shape.setName(request.getName());
        shape.setType(request.getType());
        shape.setDimensionData(request.getDimensionData());

        Shape updatedShape = shapeRepository.save(shape);
        return mapToResponse(updatedShape);
    }

    @Override
    public void delete(Long id) {
        if (!shapeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Shape not found with id: " + id);
        }
        shapeRepository.deleteById(id);
    }

    private void validateDimensionData(ShapeType type, Map<String, Object> data) {
        if (data == null || data.isEmpty()) {
            throw new InvalidShapeException("Dimension data cannot be empty");
        }

        switch (type) {
            case RECTANGLE:
                if (!hasNumericKey(data, "width") || !hasNumericKey(data, "height")) {
                    throw new InvalidShapeException("RECTANGLE requires numeric 'width' and 'height'");
                }
                break;
            case CIRCLE:
                if (!hasNumericKey(data, "radius")) {
                    throw new InvalidShapeException("CIRCLE requires numeric 'radius'");
                }
                break;
            case TRIANGLE:
                if (!hasNumericKey(data, "base") || !hasNumericKey(data, "height")) {
                    throw new InvalidShapeException("TRIANGLE requires numeric 'base' and 'height'");
                }
                break;
            default:
                throw new InvalidShapeException("Unsupported shape type: " + type);
        }
    }

    private boolean hasNumericKey(Map<String, Object> data, String key) {
        if (!data.containsKey(key))
            return false;
        Object val = data.get(key);
        return val instanceof Number;
    }

    private ShapeResponse mapToResponse(Shape shape) {
        return new ShapeResponse(
                shape.getId(),
                shape.getName(),
                shape.getType(),
                shape.getDimensionData(),
                shape.getCreatedAt());
    }
}
