const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 443;

app.get('/', async(req, res) => {
    await res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
    // on connect
    console.log(`a user connected | id: ${socket.id}`);
    
    // on disconnect
    socket.on('disconnect', () => {
        console.log(`a user disconnected | id: ${socket.id}`);
    });

    // on key press
    socket.on('key pressed', (kc) => {
        io.emit('key pressed', kc)
    });
});

server.listen(port, () => {
    console.log(`server listening on ${port}`);
});