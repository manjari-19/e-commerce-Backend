import http from 'http';
import expressServer from './server';
import connectPSQlDb from './config/dbConnection';

// Normalize port number which will expose server
const port = normalizePort(8082);

// Instantiate the expressServer class
const expressInstance = new expressServer().expressInstance;

// Make port available within server
expressInstance.set('port', port);

// Create the HTTP Express Server
export const server = http.createServer(expressInstance);

// Start listening on the specified Port (Default: 3000)
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

connectPSQlDb();

// Port Normalization
function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) {
      return val;
  } else if (port >= 0) {
      return port;
  } else {
      return false;
  }
}