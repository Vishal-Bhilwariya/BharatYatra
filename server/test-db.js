const mongoose = require('mongoose');
const fs = require('fs');
const dns = require('dns');

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

mongoose.connect('mongodb+srv://bharatYatra:bharatYatra90@bharatyatra.9v7edjt.mongodb.net/bharatyatra?retryWrites=true&w=majority')
  .then(() => {
    fs.writeFileSync('output.txt', 'Connected');
    process.exit(0);
  })
  .catch(err => {
    fs.writeFileSync('output.txt', err.toString());
    process.exit(1);
  });
