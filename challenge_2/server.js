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
  returning.unshift(`<div id="inputContainer" style="font-family: 'Courier New', Courier, monospace; border-bottom: 2px dashed black;">
  <h1>Welcome to our CSV Report Generator!</h1>
  <h2>Such exciting stuff, right?</h2>
  <h3>I know I can barely contain my excitement!</h3>
  <h4>Anyway, input the JSON data you would like to transform into a CSV report and we can get started.</h4><br><br>

  <form action="http://localhost:8000/JSONData" method="POST" >
    <label for="JSONtext">Please input JSON data below:<br></label>
    <textarea id="JSONtext" name="JSONtext" rows="10" cols="50"></textarea>
    <input type="submit" value="Submit and receive your data printed below">
  </form>
  <br><br><br>
</div>

<div id="outputContainer" style="font-family: 'Courier New', Courier, monospace;">
  <h4>Sooo <em>excited</em> for that data to get over here so we can check it out! Aren't you?!</h4>
  <div id="dataOutput">

  </div>
</div>`)
  console.log(returning);
  res.send(returning.join('<br>'));
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})