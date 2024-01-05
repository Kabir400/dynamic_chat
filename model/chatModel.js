//external import--
const mongoose = require("mongoose");

//defining schema--
const chatSchema = mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reciver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    require: true,
  },
});

//defining model--
const chatModel = mongoose.model("Chats", chatSchema, "Chats");

module.exports = chatModel;
