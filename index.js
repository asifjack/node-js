const express = require('express');

const bodyParser = require('body-parser');
const user =require('./src/routes/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',user);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
});













