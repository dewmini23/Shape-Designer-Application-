# Shape Designer (React + Spring Boot + MySQL)

A full-stack Shape Designer web application that allows users to create, visualize (HTML5 Canvas), modify, and persist geometric shapes (Rectangle, Circle, Triangle). The UI updates shape rendering and calculated area dynamically, and saves data via a REST API backed by MySQL.

## Tech Stack
- Frontend: React (Create React App), HTML5 Canvas
- Backend: Java Spring Boot, REST, JPA/Hibernate
- Database: MySQL

## Project Structure

.
├── backend
└── frontend


## Prerequisites
- Node.js + npm
- Java 17+
- Maven
- MySQL 8+

---

## Database Setup (MySQL)

1) Update the database:

Update backend DB config:
backend/src/main/resources/application.properties

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/shape_database?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD


Run Backend (Spring Boot)

Backend runs at: http://localhost:8080

Swagger UI
http://localhost:8080/swagger-ui/index.html

Run Frontend (React)

From the frontend/ folder:
npm install
npm start

Frontend runs at:
http://localhost:3000

<h2>API Documentation</h2>

Base URL: http://localhost:8080/api/shapes

Shape Request Body
dimensionData depends on type.

Rectangle:

{
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": { "width": 100, "height": 100 }
}

Circle:

{
  "name": "My Circle",
  "type": "CIRCLE",
  "dimensionData": { "radius": 50 }
}

Triangle:

{
  "name": "My Triangle",
  "type": "TRIANGLE",
  "dimensionData": { "base": 100, "height": 80 }
}

Endpoints

1) Create Shape

POST /api/shapes

Example:

curl -X POST http://localhost:8080/api/shapes \
  -H "Content-Type: application/json" \
  -d '{"name":"New Rect","type":"RECTANGLE","dimensionData":{"width":120,"height":60}}'
  
2) Get All Shapes

GET /api/shapes

Example:

curl http://localhost:8080/api/shapes

3) Get Shape By ID

GET /api/shapes/{id}

Example:

curl http://localhost:8080/api/shapes/1

4) Update Shape

PUT /api/shapes/{id}

Example:

curl -X PUT http://localhost:8080/api/shapes/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Rect","type":"RECTANGLE","dimensionData":{"width":200,"height":80}}'
  
5) Delete Shape

DELETE /api/shapes/{id}

Example:

curl -X DELETE http://localhost:8080/api/shapes/1
::contentReference[oaicite:0]{index=0}
