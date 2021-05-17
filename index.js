const express = require("express");
const app = express();

const http = require("http");
const { stdin } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./build"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile("./build/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("cmd", (cmd) => {
        console.log(cmd);
        const exec = require('child_process').exec

        exec(JSON.parse(cmd).command, (err, stdout, stderr) => {
            io.emit("output", "Output: " + JSON.stringify(stdout) + "\n" + "Error: " + JSON.stringify(err))
            console.log("Output: " + JSON.stringify(stdout) + "\n" + "Error: " + JSON.stringify(err))
        });
    });
})

server.listen(3001, () => {
    console.log("listening on *:3001");
})
