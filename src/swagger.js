import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Proyecto final lvl 2',
    description: 'Description'
  },
  host: 'localhost:3000',
  servers: [
    {
      url: 'http://localhost:3000/api/v1'       
    },]
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc).then(async () => {
    await import('./index.js'); // Your project's root file
  });