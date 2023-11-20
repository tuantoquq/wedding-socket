import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { addWish } from './comment.service.js';
dotenv.config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('addWish', async (wish) => {
    const comment = await addWish(wish);
    io.emit('newWish', comment);
  });
});

const port = process.env.APP_PORT || 8080;

server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
