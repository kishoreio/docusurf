"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";

interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
}

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 mb-4 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar className="h-8 w-8">
              {message.role === "user" ? (
                <>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
