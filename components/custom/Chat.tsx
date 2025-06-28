"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const users = ["alice", "jan", "john"];

interface ChatProps {
  user: {
    user_id: string;
    email: string;
    exp: number;
  };
}

const Chat = ({ user }: ChatProps) => {
  const [selectedUser, setSelectedUser] = React.useState("jan");
  const [messages, setMessages] = React.useState<any>([]);
  const [message, setMessage] = React.useState("");

  const {email: username} = user;

  useEffect(() => {
    socket.emit("join", { username });

    socket.on("private_message", (data) => {
      const { sender, recipient, text } = data;

      if (
        (sender === username && recipient === selectedUser) ||
        (sender === selectedUser && recipient === username)
      ) {
        setMessages((prevMessages) => [...prevMessages, { sender, text }]);
      }
    });

    return () => {
      socket.off("private_message");
    };
  }, [username, selectedUser]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const payload = {
      sender: username,
      recipient: selectedUser,
      text: message,
    };

    socket.emit("private_message", payload);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Logged in as: {username}</h2>

      <div>
        <label>Recipient: </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users
            .filter((u) => u !== username)
            .map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
        </select>
      </div>

      <div
        style={{
          marginTop: 20,
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{ textAlign: msg.sender === username ? "right" : "left" }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          style={{ width: "80%" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
