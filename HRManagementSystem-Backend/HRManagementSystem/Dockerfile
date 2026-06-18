# Stage 1: Build the Maven project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first to leverage Docker cache
RUN mvn dependency:go-offline
COPY src ./src
# Package the application, skipping tests for faster builds
RUN mvn package -DskipTests

# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Copy the executable JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the port the application will run on
EXPOSE 8080
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]