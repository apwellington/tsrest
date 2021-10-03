import dotenv from 'dotenv';
import Server from './models/server';

//configureacion ambiente
dotenv.config();

const server = new Server();

server.listen();
