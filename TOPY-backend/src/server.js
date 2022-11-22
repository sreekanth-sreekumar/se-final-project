const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors')

const Controller = require('./controller');

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/create_parent', async (req, res) => {
  const { body } = req;
  const first_name = body.first_name;
  const last_name = body.last_name;
  const result = await Controller.createParent(first_name, last_name)
  return res.json(result);
});

app.post('/api/create_senior_citizen', async (req, res) => {
  const { body } = req
  const first_name = body.first_name;
  const last_name = body.last_name;
  const start_time = body.start_time;
  const end_time = body.end_time;
  const result = await Controller.createSeniorCitizen(first_name, last_name, start_time, end_time)
  return res.json(result);
});

app.get('/api/list_available_slots', (req, res) => {
    Controller.getAvailableSlots().then(data => {
      return res.json(data)})
});

app.post('/api/create_meeting', (req, res) => {
  const { body} = req
  const parent_child_id = body.parent_child_id; 
  const parent_pet_id = body.parent_pet_id ? body.parent_child_id : 0; 
  const senior_citizen_id = body.senior_citizen_id ? body.senior_citizen_id : 0;
  const start_time = body.start_time;
  Controller.createMeeting(parent_child_id, parent_pet_id, senior_citizen_id, start_time).then(data => res.json(data));
})

app.get('/api', (req, res) => {
  res.send(`<h1>API Works !!!</h1>`)
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})