const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Новое подключение');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    })

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Сервер запущен на порту &{PORT}');
});
