
import * as http from 'http';
import { AddressInfo } from 'net';
import application from './app';
import logger from './utils/logger';


const PORT = process.env.PORT || 3000;
const server = http.createServer(application.instance);

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
      throw error;
  }
  // handle specific error codes here.
  throw error;
}

function serverListening(): void {
  const addressInfo: AddressInfo = <AddressInfo>server.address();
  logger.info(`Listening on ${addressInfo.address}:${PORT}`);
}

server.on('error', serverError);
server.on('listening', serverListening);


server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
  // application specific logging, throwing an error, or other logic here
});