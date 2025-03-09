"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import axios from "axios";
import { ADD_MESSAGE, GET_MESSAGES } from "@/utils/constants";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useUser} from "@clerk/nextjs"; // Import Clerk's useUser hook
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

// Loading skeleton for messages
const LoadingSkeleton = () => (
  <div className="space-y-4 h-[50vh] overflow-y-auto pr-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex justify-start">
        <div className="animate-pulse bg-gray-200 rounded-lg px-4 py-2 max-w-xs w-32 h-12"></div>
      </div>
    ))}
  </div>
);

function MessageContainer() {
  const { orderId } = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const { user } = useUser(); 
  const isLoaded = user ? user.id : false;
  const [recipentId, setRecipentId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<
    { id: string; senderId: string; text: string; createdAt: string; isRead: boolean }[]
  >([]);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  useEffect(() => {
    const getMessages = async () => {
      

      try {

        setIsLoading(true);
        const token = await getToken();
        setError(null);
        const {
          data: { messages: dataMessages, recipentId: recipent },
        } = await axios.get(`${GET_MESSAGES}/${orderId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}` // Optional: Add token if your API requires it
          },
          params: { userId: user?.id, orderId: orderId},
        });
        setMessages(dataMessages || []);
        setRecipentId(recipent);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId && user) {
      getMessages();
    }
  }, [orderId, user, isLoaded, router, getToken]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp
  function formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? Number(`0${minutes}`) : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  // Send a new message
  const sendMessage = async () => {
    console.log("Sending message:", messageText);
    if (!messageText.trim() || !user || !recipentId) return; // Prevent sending if empty or missing data
    try {
      const token = await getToken();
      const response = await axios.post(
        `${ADD_MESSAGE}/${orderId}`,
        {
          message: messageText,
          recipentId,
          senderId: user?.id, // Use Clerk user ID as senderId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}` // Optional: Add token if your API requires it
          }
        }
      );
      if (response.status === 201) {
        setMessages([...messages, response.data.message]);
        setMessageText("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && messageText.trim()) {
      sendMessage();
    }
  };

  return (
    <section
      className="min-h-[80vh] px-4 sm:px-6 lg:px-32 py-10 mt-10 flex justify-center"
      aria-label="Messages for Order"
    >
      <div className="bg-white py-8 px-4 sm:px-10 w-full max-w-4xl border shadow-md rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
          <Link
            href="/buyer/orders"
            className="text-gray-600 hover:text-lumo-primary transition mr-4"
            aria-label="Back to Orders"
          >
            <IoArrowBack size={24} />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Messages for Order #{orderId}
          </h1>
        </div>

        {/* Messages Area */}
        <div className="flex-1 h-[50vh] overflow-y-auto pr-4 space-y-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div
              className="text-center text-red-600 p-4 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
              <button
                className="ml-2 underline focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === user?.id
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`inline-block rounded-lg ${
                    message.senderId === user?.id
                      ? "bg-lumo-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  } px-4 py-2 max-w-xs break-words relative shadow-sm`}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`text-xs ${
                        message.senderId === user?.id
                          ? "text-gray-200"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </span>
                    {message.senderId === user?.id && message.isRead && (
                      <BsCheckAll className="text-gray-200 ml-2" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="text"
            className="flex-1 rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lumo-primary focus:border-transparent text-gray-800"
            placeholder="Type a message..."
            name="message"
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            value={messageText}
            aria-label="Type a message"
            disabled={!user} // Disable input if not authenticated
          />
          <button
            type="submit"
            className={`rounded-full p-3 ${
              messageText.trim() && user
                ? "bg-lumo-primary hover:bg-lumo-accent text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors duration-200`}
            onClick={sendMessage}
            disabled={!messageText.trim() || !user}
            aria-label="Send message"
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MessageContainer;