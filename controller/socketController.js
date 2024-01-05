const userModel = require("../model/userModel.js");
const chatModel = require("../model/chatModel.js");

const socketConnect = (io) => {
  io.on("connection", async (socket) => {
    const userId = socket.handshake.auth.token;
    await userModel.updateOne({ _id: userId }, { $set: { is_online: "1" } });
    socket.broadcast.emit("changeOnline", userId);

    //one to one chat--

    //saving messages into the database--
    socket.on("msg-init", async (data) => {
      try {
        const chat = new chatModel(data);
        const newChat = await chat.save();
        socket.emit("chatSuccess", { data: newChat });
      } catch (err) {
        socket.emit("chatErr");
        console.log(err);
      }
    });

    //display message into others diplay--
    socket.on("msg-send", ({ data }) => {
      socket.broadcast.emit("display-msg", data);
    });

    //displaying old chats--
    socket.on("existChat", async (data) => {
      const chats = await chatModel.find({
        $or: [
          { sender_id: data.sender_id, reciver_id: data.reciver_id },
          { sender_id: data.reciver_id, reciver_id: data.sender_id },
        ],
      });

      socket.emit("loadChats", { chats: chats });
    });

    socket.on("disconnect", async () => {
      await userModel.updateOne({ _id: userId }, { $set: { is_online: "0" } });
      socket.broadcast.emit("changeOffline", userId);
    });
  });
};

module.exports = socketConnect;
