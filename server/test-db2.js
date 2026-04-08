const mongoose = require('mongoose');
const fs = require('fs');

const uri = "mongodb://bharatYatra:bharatYatra90@ac-zo9lu8o-shard-00-00.9v7edjt.mongodb.net:27017,ac-zo9lu8o-shard-00-01.9v7edjt.mongodb.net:27017,ac-zo9lu8o-shard-00-02.9v7edjt.mongodb.net:27017/bharatyatra?ssl=true&replicaSet=atlas-gj6mux-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    fs.writeFileSync('output2.txt', 'Connected');
    process.exit(0);
  })
  .catch(err => {
    fs.writeFileSync('output2.txt', err.toString());
    process.exit(1);
  });
