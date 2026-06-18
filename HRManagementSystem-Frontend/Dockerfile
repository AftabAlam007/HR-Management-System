# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
# The VITE_API_BASE_URL will be passed as a build argument
# This bakes the URL into the static files
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:1.25-alpine
# Copy the built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a custom Nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for the web server
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]