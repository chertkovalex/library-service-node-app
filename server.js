const http = require('http');
const app = require('./app');
const db = require('./config/database');
const port = process.env.port || 6032;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server started at port ' + port);
  db.once('open', function() {
    // we're connected!
    console.log('Connected to MongoDB database');
  });
});
