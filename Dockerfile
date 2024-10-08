# Use the official Node.js image as the base
FROM node:20.17-bookworm-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
