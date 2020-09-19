const express = require('express');
const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/client'));

app.get('/JSONData', (req, res) => {
  res.send('Got a GET request at port 8000');
})

app.post('/JSONData', (req, res) => {
  let data = JSON.parse(req.body.JSONtext);
  let keys = Object.keys(data);
  keys.pop();
  console.log(keys);
  let props = [];
  let results = [];

  let tempArray = [];
  const recurseData = (node) => {

    console.log(node);
    tempArray = [];
    for (let key in node) {
      if (key !== 'children') {
        tempArray.push(node[key]);
      }
    }
    props.push(tempArray);
    if (node.children !== undefined && node.children.length > 0) {
      // debugger;
      for (let i = 0; i < node.children.length; i++) {
        recurseData(node.children[i]);
      }
    }
  // }
  }

  recurseData(data);
  results.push(keys.join());
  for (let i = 0; i < props.length; i++) {
    results.push(props[i].join());
  }
  let returning = [];
  returning.push(results.join('<br>'), '<br><br>Inputed Data:<br><br>', req.body.JSONtext);
  console.log(returning);
  res.send(returning.join('<br><br>'));
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})