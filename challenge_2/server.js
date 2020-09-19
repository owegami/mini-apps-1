const express = require('express');
const app = express();
const port = 8000;


app.use(express.json());
app.use(express.static(__dirname + '/client'));

app.get('/JSONData', (req, res) => {
  res.send('Got a GET request at port 8000');
})

app.post('/JSONData', (req, res) => {
  let data = req.body;
  let keys = Object.keys(data);
  keys.pop();
  console.log(keys);
  let props = [];
  let result = [];

  const recurseData = (node) => {
    // debugger;
    // console.log('node:', node);
    for (let i = 0; i < node.length; i++) {
      let tempArray = [];
      for (let key in node[i]) {
        if (key != 'children') {
          tempArray.push(node[i][key]);
        }
      }
      // debugger;
      // console.log('temp:', tempArray);
      props.push(tempArray);
      if (node[i].children.length > 0) {
        // debugger;
        recurseData(node[i].children);
      }
    }
  }

  recurseData(data.children);
  // console.log('props:', props);
  result.push(keys.join());
  for (let i = 0; i < props.length; i++) {
    result.push(props[i].join());
  }
  result = result.join('\n');
  console.log(result);
  res.send(result);
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})