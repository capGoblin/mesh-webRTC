/* eslint-disable no-undef */
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://127.0.0.1:5175",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
const PORT = process.env.PORT || 8080;

interface Users {
  id: string;
  email: string;
}
interface UserData {
  [room: string]: Users[];
}

interface SocketToRoom {
  [id: string]: string;
}

const users: UserData = {};

const socketToRoom: SocketToRoom = {};

const maximum = 4;

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("join....");
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[data.room].push({ id: socket.id, email: data.email });
    } else {
      users[data.room] = [{ id: socket.id, email: data.email }];
    }
    socketToRoom[socket.id] = data.room;

    socket.join(data.room);
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter(
      (user) => user.id !== socket.id
    );

    console.log(usersInThisRoom);

    io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
  });

  socket.on("send-data", (data) => {
    console.log(`${data} is in server`);

    // await socket.join(roomId);
    // setTimeout(() => {
    // Emit the "receive-data" event after a 2-second delay
    socket.broadcast.emit("receive-data", data);
    // }, 5000);
  });

  socket.on("send-changes", async (delta) => {
    console.log("text is in server");

    // await socket.join(roomId);
    // setTimeout(() => socket.broadcast.emit("receive-changes", delta), 3000);

    socket.broadcast.emit("receive-changes", delta);
  });

  socket.on("offer", (data) => {
    console.log("offer", data.sdp);
    socket.to(data.offerReceiveID).emit("getOffer", {
      sdp: data.sdp,
      offerSendID: data.offerSendID,
      offerSendEmail: data.offerSendEmail,
    });
  });

  socket.on("answer", (data) => {
    console.log("answer", data.sdp);
    socket
      .to(data.answerReceiveID)
      .emit("getAnswer", { sdp: data.sdp, answerSendID: data.answerSendID });
  });

  socket.on("candidate", (data) => {
    console.log("candidate", data.candidate);
    socket.to(data.candidateReceiveID).emit("getCandidate", {
      candidate: data.candidate,
      candidateSendID: data.candidateSendID,
    });
  });

  socket.on("disconnect", () => {
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        return;
      }
    }
    socket.to(roomID).emit("user_exit", { id: socket.id });
    console.log(users);
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
