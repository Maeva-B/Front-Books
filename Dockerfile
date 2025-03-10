# Use the official Node.js image as a base
FROM node:20.15.0 AS build

# Set the working directory for the frontend application
WORKDIR /

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend project into the container
COPY . .

RUN npm run build

# Expose the port that Vue.js uses in development
EXPOSE 5173

# Command to start the Vue.js development server, binding to all network interfaces
CMD ["npm", "run", "preview", "--", "--port", "5173", "--host"]