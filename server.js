import express from 'express';
import router from './routes/envelopes.js';
import bodyParser from 'body-parser';
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api/envelopes', router);


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
