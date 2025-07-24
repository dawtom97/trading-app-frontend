"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { RecipientsTable } from "./chat/RecipientsTable";
import { User } from "./chat/types/User.types";


const socket = io("http://localhost:5000");

interface ChatProps {
  user: User;
  allUsers: User[];
}

const Chat = ({ user, allUsers }: ChatProps) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [message, setMessage] = React.useState("");

  const { email: username } = user;

  useEffect(() => {
    if (!selectedUser) return;

    socket.emit("join", { username });

    socket.on("private_message", (data) => {
      const { sender, recipient, text } = data;
      if (
        (sender === username && recipient.email === selectedUser.email) ||
        (sender === selectedUser.email && recipient.email === username)
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

  const handleSelectUser = (user: User) => {
    setMessages([]);
    // pobieram wiadomości z serwera dla wybranego użytkownika
    setSelectedUser(user);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Logged in as: {username}</h2>

      <RecipientsTable handleSelect={handleSelectUser} data={allUsers} />

      <div style={{ flex: 1, padding: 20 }}>
        {selectedUser && (
          <div className="bg-white border rounded-lg shadow flex flex-col h-[500px]">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
              <span>Czat z: {selectedUser.username}</span>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === username ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.sender === username
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Napisz wiadomość..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Wyślij
              </button>
            </div>
          </div>
        )}

        {!selectedUser && (
          <p className="text-gray-500">
            Wybierz użytkownika, aby rozpocząć czat
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
