import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type Message, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { IoSend } from "react-icons/io5";

const COOKIE_NAME = "curhat-with-ai";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Halo kak, bagaimana kabarnya hari ini?",
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      placeholder="Type your message here..."
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 text-lg"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none text-lg bg-blue"
      onClick={() => {
        if (!input) return;
        sendMessage(input);
        setInput("");
      }}
    >
      <IoSend />
    </Button>
  </div>
);

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);
    const last10mesages = newMessages.slice(-10);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10mesages,
        user: cookie[COOKIE_NAME],
      }),
    });
    const data = await response.json();

    // strip out white spaces from the bot message
    const botNewMessage = data.text.trim();

    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "bot" } as Message,
    ]);
    setLoading(false);
  };

  return (
    <div className="relative flex flex-col bg-gray-400 h-[92vh]">
      <div className="overflow-y-auto p-4 pb-24">
        {messages.map(({ message, who }, index) => (
          <ChatLine key={index} who={who} message={message} />
        ))}

        {loading && <LoadingChatLine />}
      </div>
      <div className="absolute bottom-0 left-0 z-20 w-full p-4 bg-gray-300">
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
