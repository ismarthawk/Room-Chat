const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const uuid = require("uuid");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  res.render("chat", {
    userName,
  });
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

io.on("connection", (socket) => {
  console.log("Joined");
  socket.on("receive-msg", (msg, userName) => {
    console.log(userName, msg);
    socket.broadcast.emit("send-msg", msg, userName);
  });
});

httpServer.listen(3000);
