import _ from './env.js'
import express from 'express';
import bodyParser from 'body-parser';
import envelopes from './routes/envelopes.js';



const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }));
app.use('/api/envelopes', envelopes);


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
