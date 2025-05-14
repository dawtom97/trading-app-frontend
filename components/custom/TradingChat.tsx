"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User } from "lucide-react"

export function TradingChat() {
  const [message, setMessage] = useState("")

  // Sample chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Welcome to TradePro chat! Discuss market trends and get advice from fellow traders.",
      time: "10:30 AM",
    },
    { id: 2, sender: "user", text: "Hi everyone! What do you think about BTC today?", time: "10:32 AM" },
    {
      id: 3,
      sender: "John",
      text: "I think we might see a breakout above $45K if the volume picks up in the next few hours.",
      time: "10:35 AM",
    },
    {
      id: 4,
      sender: "Sarah",
      text: "I'm watching the 200-day moving average closely. It's been a strong resistance level.",
      time: "10:37 AM",
    },
    { id: 5, sender: "user", text: "Thanks for the insights! I'll keep an eye on those levels.", time: "10:40 AM" },
  ])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="flex h-[400px] flex-col rounded-md border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <h2 className="font-medium text-gray-800">Trading Community Chat</h2>
        <p className="text-sm text-gray-500">24 traders online</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : msg.sender === "system"
                    ? "bg-gray-100 text-gray-600 italic"
                    : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.sender !== "user" && msg.sender !== "system" && (
                <div className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-600">
                  <User className="h-3 w-3" />
                  {msg.sender}
                </div>
              )}
              <p className="text-sm">{msg.text}</p>
              <div className={`mt-1 text-right text-xs ${msg.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
