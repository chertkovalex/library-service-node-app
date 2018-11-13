const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://vaspup:IjCNdk5BBaqbvoA4@cluster0-shard-00-00-nlxzz.mongodb.net:27017,cluster0-shard-00-01-nlxzz.mongodb.net:27017,cluster0-shard-00-02-nlxzz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
  //'mongodb://localhost:27017',
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
