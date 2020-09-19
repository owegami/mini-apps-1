const jsonFetcher = () => {
  let data = $('#JSONtext').val();
  console.log(data);
  let xmlResponse;

  const req = new XMLHttpRequest();
  req.open('POST', '/JSONData', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onreadystatechange = (e) => {
    xmlResponse = req.responseText;
    console.log(xmlResponse);
    document.getElementById('dataOutput').innerHTML = xmlResponse + '<br><br> <span style="font-weight: bold"><em>Original Data:<em></span><br><br>' + data;
  }
  let res = req.send(data);

}

const output = () => {
  console.log(arguments);
}