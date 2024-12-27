import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketServer(server);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('updateLocation', (data) => {
      socket.broadcast.emit('locationUpdate', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});

