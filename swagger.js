const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie API',
    description: 'Movie Application Programming Interface',
  },
  host: 'cse341-team4-project.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
