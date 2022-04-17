const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (message) => {
    console.log(`message: ${message}`);
  });
});

// io.emit("some event", {somePropety: "some value", otherPropety: "other value"});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(4000, () => {
  console.log("Running in http://localhost:4000");
});
