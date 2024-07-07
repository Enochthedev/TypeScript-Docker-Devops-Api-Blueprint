# Stage 1: Builder
FROM node:16 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production
FROM node:16-slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

# Use the built server.js file as the entry point
CMD [ "node", "dist/server.js" ]

# Stage 3: Development
FROM node:16 as development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Install nodemon and ts-node
RUN npm install nodemon ts-node --save-dev

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npx", "nodemon", "--watch", "src", "--exec", "ts-node", "src/app.ts"]
