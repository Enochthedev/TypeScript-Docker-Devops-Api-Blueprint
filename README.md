# Docker-Typescript-Node-Express-MongoDB-Jest-Template with CI/CD

## Description
This is a template for a Node.js application using Typescript, Express, MongoDB, and Jest. It also includes a Dockerfile and a Jenkinsfile for CI/CD.

## Prerequisites
- Docker
- Node.js
- MongoDB
- Jenkins

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run build` to build the project
4. Run `npm start` to start the server
5. Open your browser and go to `http://localhost:3000`
6. You should see a message saying "Hello, World!"
7. To run the tests, run `npm test`
8. To run the docker container, run `docker build -t <your-image-name> .` and then `docker run -p 3000:3000 <your-image-name>`

## Usage
This boilerplate is a good starting point for a Node.js application using Typescript, Express, MongoDB, and Jest. It allows you to quickly set up a new project and start coding without having to worry about the initial setup, and the CI/CD pipeline is already set up for you.The code Structure is as follows:
```
.github/
├── workflows
│   └── ci.yml
│   └── UnitTest.yml
src/
├── config
│   └── dbConfig.ts
├── controllers
│   └── user.controller.ts
├── models
│   └── user.model.ts
├── routes
│   └── user.routes.ts
│   └── routes.Config.ts
├── services
│   └── user.service.ts
├── utils
│   └── logger.ts
├── middleware
│   └── error.middleware.ts
├── tests/
│   └── user.test.ts
│   └── jest.config.ts
│   └── setup.ts
│   └── teardown.ts
│   └── jestGlobalMocks.ts
│   └── jest.setup.ts
│   └── jest.teardown.ts
│   └── jestGlobalMocks.ts
├── app.ts
.env.sample
.gitignore
.eslintrc.json
.nvmrc
package.json
README.md
tsconfig.json
```

Author: Wave
Email: wave@example.com