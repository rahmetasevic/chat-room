const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const { Server } = require('socket.io');
const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
    // connectionStateRecovery: {}
});

app.get('/', (req, res) => {
    res.status(200).json({message: 'It\s working!'});
});


const users = {};
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('welcome_message', (data) => {
        users[socket.id] = {name: data.name};
        socket.emit('send_welcome', {message: `Welcome ${data.name}!`});
        io.emit('users', Object.values(users));
    });

    socket.on("send_message", (data) => {
        console.log("User Send Message", data);
        io.emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete users[socket.id];
        io.emit("disconnected", socket.id);
    });
    
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
