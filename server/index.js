const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

// frontend kodunun hangi url'de çalışağını ve hangi metodları kullanacağını belirtiyoruz.
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// bağlantı durumları
io.on("connection", (socket) => {
    // kullanıcı bağlandı
    console.log(`User Connected: ${socket.id}`);
    //Kullanıcı odaya katıldı
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })
    // Mesaj işlemleri
    socket.on("send_message", (data) => {
        console.log(data);
    });
    // kullanıcı çıkış yaptı
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

// port numarası dinleniyor.
server.listen(3001, () => {
    console.log("SERVER RUNNING");
});