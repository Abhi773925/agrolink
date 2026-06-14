import axios from "axios";
import { Paperclip, Search, Send, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://agrolink-5ok6.onrender.com");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fileRef = useRef(null);
  const endRef = useRef(null);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [messagesRes, profilesRes] = await Promise.all([
          axios.get("https://agrolink-5ok6.onrender.com/api/messages"),
          axios.get("https://agrolink-5ok6.onrender.com/api/users/profiles"),
        ]);
        setMessages(messagesRes.data || []);
        setFarmers(profilesRes.data || []);
      } catch (error) {
        console.error("Failed loading chat data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const receiveHandler = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", receiveHandler);
    return () => {
      socket.off("receiveMessage", receiveHandler);
    };
  }, [currentUser?._id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const value = searchQuery.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.message?.toLowerCase().includes(value) ||
        msg.sender?.name?.toLowerCase().includes(value)
    );
  }, [messages, searchQuery]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!message.trim() && !file) return;

    const formData = new FormData();
    formData.append("message", message);
    formData.append(
      "sender",
      JSON.stringify({
        id: currentUser._id,
        name: currentUser.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || "User")}`,
      })
    );
    if (file) formData.append("file", file);

    setSending(true);
    try {
      const response = await axios.post("https://agrolink-5ok6.onrender.com/api/messages", formData);
      setMessages((prev) => [...prev, response.data]);
      socket.emit("sendMessage", response.data);
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Send message failed", error);
    } finally {
      setSending(false);
    }
  };

  if (!currentUser?.name) {
    return (
      <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600 shadow-sm">
          Please login to access community chat.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-12">
        <aside className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Community</h2>
            <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">{farmers.length}</span>
          </div>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm text-gray-900 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search chat"
            />
          </div>
          <div className="max-h-[32rem] space-y-2 overflow-y-auto">
            {farmers.map((farmer) => (
              <div key={farmer._id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">{farmer.name}</p>
                <p className="text-xs text-gray-600">{farmer.crop || farmer.role || "Farmer"}</p>
              </div>
            ))}
          </div>
        </aside>

        <article className="flex min-h-[38rem] flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-8">
          <header className="flex items-center justify-between border-b border-gray-200 p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Community Chat</h1>
              <p className="text-sm text-gray-600">Logged in as {currentUser.name}</p>
            </div>
            <Users className="h-5 w-5 text-green-700" />
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {loading ? (
              <p className="text-sm text-gray-600">Loading messages...</p>
            ) : (
              filteredMessages.map((msg) => {
                const mine = msg.sender?.id === currentUser._id;
                return (
                  <div key={msg._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg border px-3 py-2 ${mine ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
                      <p className="text-xs font-medium text-gray-700">{msg.sender?.name}</p>
                      {msg.message && <p className="mt-1 text-sm text-gray-900">{msg.message}</p>}
                      {msg.imageUrl && (
                        <img src={msg.imageUrl} alt="Shared" className="mt-2 max-h-52 rounded-lg object-cover" />
                      )}
                      {msg.pdfUrl && (
                        <a href={msg.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-green-700 hover:text-green-800">
                          {msg.pdfName || "Open PDF"}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-gray-200 p-4">
            {file && <p className="mb-2 text-xs text-gray-600">Attached: {file.name}</p>}
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message"
                className="h-11 flex-1 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={sending || (!message.trim() && !file)}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Send className="mr-2 h-4 w-4" />
                {sending ? "Sending" : "Send"}
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </form>
        </article>
      </div>
    </section>
  );
};

export default ChatBox;