import _ from './env.js'
import express from 'express';
import bodyParser from 'body-parser';
import envelopes from './routes/envelopes.js';
import path from 'node:path';
import swaggerJSDoc from 'swagger-jsdoc';
import  SwaggerUI  from 'swagger-ui-express';


const app = express();

const PORT = process.env.PORT || 5000;

const option = {
  definition:{
    openapi: '3.0.0',
    infor:{
      title:  "Envelopes API",
      version : "1.0",
      description:" A simple Envelopes API"
    },
    servers:[
      {url:"http://localhost:5000"},
      {url:"https://alalinga.herokuapp.com"}
    ]
    
  },
  apis:["./routes/envelopes.js"]
};

const specs = swaggerJSDoc(option);

app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }));
app.use('/api/envelopes', envelopes);
app.use('/envelopes/api-docs',SwaggerUI.serve, SwaggerUI.setup(specs))
 
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
