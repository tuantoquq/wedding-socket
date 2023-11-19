import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { addWish } from './comment.service.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('addWish', async (wish) => {
    console.log('Wish added', wish);
    const comment = await addWish(wish);
    console.log('Comment', comment);
    io.emit('comment', comment);
  });
});

const port = process.env.APP_PORT || 8080;

server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
