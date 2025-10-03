"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { RecipientsTable } from "./chat/RecipientsTable";
import { User } from "./chat/types/User.types";
import { useLazyGetConversationQuery } from "@/features/chat/chatApi";

const socket = io("http://localhost:5000");

interface ChatProps {
  user: User;
  allUsers: User[];
}
interface Message {
  recipient: {
    username: string;
    email: string;
    account_type:string;
    is_active: boolean
  };
  sender: string;
  text: string;
  timestamp: {
    $date: string
  }
}

const Chat = ({ user, allUsers }: ChatProps) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [message, setMessage] = React.useState("");

  // przechowujemy licznik nieprzeczytanych wiadomości { email: liczba }
  const [unread, setUnread] = React.useState<Record<string, number>>({});

  const [showConversation] = useLazyGetConversationQuery();
  const { email: username } = user;

  const handleGetOldMessages = async () => {
    if (!selectedUser) return;
    const { data } = await showConversation({
      sender: username,
      recipient: selectedUser.email,
    });
    setMessages(data?.messages || []);
  };

  useEffect(() => {
    if (!selectedUser) return;

    socket.emit("join", { username });
    handleGetOldMessages();

    socket.on("private_message", (data) => {
      const { sender, recipient, text } = data;

      const isForCurrentChat =
        (sender === username && recipient.email === selectedUser.email) ||
        (sender === selectedUser.email && recipient.email === username);

      if (isForCurrentChat) {
        // aktywny czat → pokaż wiadomość
        setMessages((prev) => [
          ...prev,
          {
            sender,
            recipient,
            text,
            timestamp: { $date: new Date().toISOString() }
          }
        ]);
      } else if (sender !== username) {
        // 🔔 nowa wiadomość od innego usera
        const audio = new Audio("/notification.mp3");
        audio.play();

        setUnread((prev) => ({
          ...prev,
          [sender]: (prev[sender] || 0) + 1, // zwiększ licznik
        }));
      }
    });

    return () => {
      socket.off("private_message");
    };
  }, [username, selectedUser]);

  const sendMessage = () => {
    if (message.trim() === "" || !selectedUser) return;

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
    setSelectedUser(user);

    // wyzeruj licznik nieprzeczytanych wiadomości dla tego usera
    setUnread((prev) => {
      const newState = { ...prev };
      newState[user.email] = 0;
      return newState;
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Logged in as: {username}</h2>

      <RecipientsTable
        handleSelect={handleSelectUser}
        data={allUsers}
        unread={unread}
      />

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
