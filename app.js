const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/route');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Application For Restfull API',
            version: '1.0.0',
            description: 'API documentation for your Company Project',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            }
        ],
    },
    apis: ['./controllers/controller.js']
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/',userRouter);

app.listen(port,()=>{
    console.log(`My Server Running at http://localhost:${port}`);
    console.log(`API Explorer Running at http://localhost:${port}/api-docs`);
});