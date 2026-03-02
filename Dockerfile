FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies  
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set production environment
ENV NODE_ENV production

# Expose the API port
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start:prod" ]
