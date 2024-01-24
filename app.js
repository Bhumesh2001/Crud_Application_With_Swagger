const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/userRoute');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Crud-app';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

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
    apis: ['./controllers/userController.js']
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/',userRouter);

app.listen(port,()=>{
    console.log(`My Server Running at http://localhost:${port}`);
    console.log(`API Explorer Running at http://localhost:${port}/api-docs`);
});