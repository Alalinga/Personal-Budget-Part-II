import express from 'express';
import envelopes  from '../data/data.js';
const router = express.Router();


const findData = (data, parameter) => {
    return data.find(singleData => singleData.id === parseInt(parameter))
  }
  
  router.get('/', (req, res, next) => {
  
    res.send({data:envelopes})
  
  });
  
  router.get('/:id', (req, res, next) => {
      const data = envelopes.find(envelope=>envelope.title===req.params.id)
  
    if (data) return res.send({data:[data]});
    res.status(404).send(`No data was found for search value ${req.params.id}`)
  });
  
  
  router.delete('/:id', (req, res, next) => {
  
    const data = findData(envelopes, req.params.id);
    if (!data) {
      return res.status(404).send(`Index number ${req.params.id} does not exist`);
  
    }
    envelopes.splice(envelopes.indexOf(data), 1)
    res.send(data);
  });
  
  router.put('/:id', (req, res, next) => {
    const data = findData(envelopes, req.params.id);
    if (!data) {
      return res.status(404).send(`Index number ${req.params.id} does not exist`);
    }
  
    if (validator(req.body).error) {
      return res.status(500).send(validator(req.body).error)
  
    }
    data.title = req.body.title;
    data.budget = req.body.budget;
    res.status(200).send(data)
  
  });
  
  router.post('/', (req, res, next) => {
  
    if (validator(req.body).error) {
      return res.status(500).send(validator(req.body).error)
    }
    const envelope = {
      id: envelopes.length + 1,
      title: req.body.title,
      budget: req.body.budget
    }
    envelopes.push(envelope);
    res.send(envelope)
  });
  
  router.post('/transfer/:from/:to', (req, res, next) => {
    
    if(req.params.from===req.params.to){
      return res.status(500).send("Sorry you cant tansfer the same budget");
    }
    const dataFrom = findData(envelopes, req.params.from);
    const dataTo = findData(envelopes, req.params.to);
    if (!dataFrom) {
      return res.status(404).send(`Index number ${req.params.from} does not exist`);
    }
    if (!dataTo) {
      return res.status(404).send(`Index number ${req.params.to} does not exist`);
    }
    
    if(dataFrom.budget<parseInt(req.body.budget)){
      return res.send(`The budget is less the amount you request to transfer`)
    }
    
    dataTo.budget+=req.body.budget;
    dataFrom.budget-=req.body.budget
    
    res.status(200).send(JSON.stringify(dataTo)+JSON.stringify(dataFrom))
  });
  
  
  const validator = data => {
        
    if (typeof data.budget !== 'number' || data.budget === null) {
      return { error: 'budget is required and must be a number' }
    }
    if (typeof data.title !== 'string' || data.title === null) {
      return { error: 'title is required and must be a string' }
    }
    return { success: true }
  }

export default router;