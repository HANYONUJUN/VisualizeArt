require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3520

//CORS 문제 해결
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, function(){
  console.log("listening on 3520")
});
