package com.shapedesigner.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "Shape Designer API", version = "1.0", description = "REST API for Shape Designer application"))
public class OpenApiConfig {
}
