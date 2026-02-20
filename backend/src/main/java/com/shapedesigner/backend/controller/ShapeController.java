package com.shapedesigner.backend.controller;

import com.shapedesigner.backend.dto.ShapeRequest;
import com.shapedesigner.backend.dto.ShapeResponse;
import com.shapedesigner.backend.service.ShapeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    private final ShapeService shapeService;

    public ShapeController(ShapeService shapeService) {
        this.shapeService = shapeService;
    }

    @PostMapping
    public ResponseEntity<ShapeResponse> createShape(@Valid @RequestBody ShapeRequest request) {
        ShapeResponse response = shapeService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ShapeResponse>> getAllShapes() {
        return ResponseEntity.ok(shapeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShapeResponse> getShapeById(@PathVariable Long id) {
        return ResponseEntity.ok(shapeService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShapeResponse> updateShape(@PathVariable Long id, @Valid @RequestBody ShapeRequest request) {
        return ResponseEntity.ok(shapeService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShape(@PathVariable Long id) {
        shapeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
