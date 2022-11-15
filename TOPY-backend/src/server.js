const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const Controller = require('./controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/create_parent', async (req, res) => {
  const { query } = req;
  const first_name = query.first_name;
  const last_name = query.last_name;
  const result = await Controller.createParent(first_name, last_name)
  return res.json(result);
});

app.post('/api/create_senior_citizen', async (req, res) => {
  const { query } = req
  const first_name = query.first_name;
  const last_name = query.last_name;
  const start_time = query.start_time;
  const end_time = query.end_time;
  const result = await Controller.createSeniorCitizen(first_name, last_name, start_time, end_time)
  return res.json(result);
});

app.get('/api/list_available_slots', (req, res) => {
    Controller.getAvailableSlots().then(data => res.json(data))
});

app.post('/api/create_meeting', (req, res) => {
  const { query } = req
  const parent_child_id = query.parent_child_id; 
  const parent_pet_id = query.parent_pet_id; 
  const senior_citizen_id = query.senior_citizen_id;
  const start_time = query.start_time;
  Controller.createMeeting(parent_child_id, parent_pet_id, senior_citizen_id, start_time).then(data => res.json(data));
})

app.get('/api', (req, res) => {
  res.send(`<h1>API Works !!!</h1>`)
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})