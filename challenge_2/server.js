const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json);

app.use(express.static(__dirname + '/client'));


app.post('/', (req, res) => {
  res.send('Got a POST request at port 3000');
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})