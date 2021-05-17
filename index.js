const express = require('express')
const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('./build'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('asd')
})




io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("cmd", (cmd) => {
        console.log(cmd)
    })
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});