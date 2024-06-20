import app from './app.js';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
