const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const folder = '/dist';

app.use(express.static(path.join(__dirname, folder)));
//render index.html page
app.get('/', (request, response) => {
  response.render('index.html');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
