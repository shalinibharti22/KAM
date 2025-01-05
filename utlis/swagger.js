// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KAM Lead Management System API',
      version: '1.0.0',
      description: 'API documentation for the Key Account Manager Lead Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000', // The URL where the API will be hosted
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the files where the API endpoints are defined
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = swaggerSpec;
