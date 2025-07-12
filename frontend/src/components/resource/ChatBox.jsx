"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  Send,
  Paperclip,
  FileText,
  ImageIcon,
  Search,
  Settings,
  Users,
  Phone,
  Video,
  MoreVertical,
  Smile,
  X,
  Menu,
  MapPin,
  Briefcase,
  Wheat,
  CheckCheck,
  Loader2,
} from "lucide-react";

const socket = io("https://agrolink-5ok6.onrender.com");

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😵",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
  "🤑",
  "🤠",
  "😈",
  "👍",
  "👎",
  "👌",
  "🤌",
  "🤏",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👈",
  "👉",
  "👆",
  "🖕",
  "👇",
  "☝️",
  "👋",
  "🤚",
  "🖐️",
  "✋",
  "🖖",
  "👏",
  "🙌",
  "🤝",
  "🙏",
  "✍️",
  "💪",
  "🦾",
  "🦿",
  "🦵",
  "🌾",
  "🌱",
  "🌿",
  "🍀",
  "🌳",
  "🌲",
  "🌴",
  "🌵",
  "🌸",
  "🌺",
  "🌻",
  "🌹",
  "🌷",
  "🌼",
  "🌙",
  "⭐",
  "🌟",
  "✨",
  "⚡",
  "🔥",
  "💯",
  "💢",
  "💥",
  "💫",
  "💦",
  "💨",
  "🕳️",
  "💣",
  "💬",
  "👁️‍🗨️",
  "🗨️",
  "🗯️",
  "💭",
  "💤",
  "👋",
  "✋",
  "🖐️",
  "🖖",
  "👌",
  "🤌",
];

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineFarmers, setOnlineFarmers] = useState([]);
  const [allFarmers, setAllFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // Default false for mobile-first
  const [showUserList, setShowUserList] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    phone: "",
    crop: "",
    region: "",
  });
  const [hoveredFarmer, setHoveredFarmer] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  // Get user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setShowSidebar(true); // Auto-show sidebar on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch current user profile and all farmers
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser?.email) {
      setIsLoading(true);

      // Fetch current user profile
      fetch(`https://agrolink-5ok6.onrender.com/api/users/profile?email=${parsedUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setFormData({
            role: data.role || "",
            phone: data.phone || "",
            crop: data.crop || "",
            region: data.region || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });

      // Fetch all farmers for the community
      fetch("https://agrolink-5ok6.onrender.com/api/users/profiles")
        .then((response) => response.json())
        .then((farmers) => {
          setAllFarmers(farmers);
          const onlineFarmersWithStatus = farmers
            .slice(0, Math.min(farmers.length, 12))
            .map((farmer) => ({
              ...farmer,
              status: Math.random() > 0.3 ? "online" : "away",
              lastSeen: new Date(),
            }));
          setOnlineFarmers(onlineFarmersWithStatus);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching farmers:", err);
          setIsLoading(false);
        });
    }
  }, []);

  // Simplified scroll detection
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isAtBottomNow = scrollHeight - scrollTop - clientHeight < 10;
      setIsAtBottom(isAtBottomNow);
    }
  }, []);

  // Simple scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!currentUser?.name) return;

    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://agrolink-5ok6.onrender.com/api/messages");
        setMessages(res.data);
        lastMessageCountRef.current = res.data.length;
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    // Real-time listeners
    socket.on("receiveMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    socket.on("userTyping", (data) => {
      if (data.userId !== currentUser._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    // Listen for user online/offline status
    socket.on("userStatusUpdate", (statusData) => {
      setOnlineFarmers((prev) =>
        prev.map((farmer) =>
          farmer._id === statusData.userId
            ? { ...farmer, status: statusData.status }
            : farmer
        )
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStatusUpdate");
    };
  }, [currentUser]);

  // Only auto-scroll for new messages when user is at bottom
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender.id === currentUser._id || isAtBottom) {
        setTimeout(scrollToBottom, 50);
      }
      lastMessageCountRef.current = messages.length;
    }
  }, [messages, isAtBottom, scrollToBottom, currentUser._id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;

    setIsSending(true);
    const formData = new FormData();
    formData.append("message", message);
    formData.append(
      "sender",
      JSON.stringify({
        id: currentUser._id,
        name: currentUser.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          currentUser.name
        )}&background=random`,
      })
    );

    if (file) formData.append("file", file);

    try {
      const res = await axios.post(
        "https://agrolink-5ok6.onrender.com/api/messages",
        formData
      );
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", res.data);
      setMessage("");
      setFile(null);
      setIsAtBottom(true);
    } catch (err) {
      console.error("❌ Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { userId: currentUser._id, name: currentUser.name });
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFarmerHover = (farmer, event) => {
    if (isMobile) return; // Disable hover on mobile
    setHoveredFarmer(farmer);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleFarmerLeave = () => {
    if (isMobile) return;
    setHoveredFarmer(null);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessage = (msg, index) => {
    const isOwnMessage = msg.sender.id === currentUser?._id;

    return (
      <div
        key={msg._id || index}
        className={`flex ${isMobile ? "mb-3" : "mb-6"} ${
          isOwnMessage ? "justify-end" : "justify-start"
        } group`}
      >
        <div
          className={`flex ${isMobile ? "max-w-[75%]" : "max-w-[70%]"} ${
            isOwnMessage ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div
            className={`flex-shrink-0 ${
              isOwnMessage
                ? isMobile
                  ? "ml-2"
                  : "ml-4"
                : isMobile
                ? "mr-2"
                : "mr-4"
            }`}
          >
            <div
              className={`${
                isMobile ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm"
              } rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold shadow-lg ring-2 ring-yellow-400/20 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/30`}
            >
              {getInitials(msg.sender.name)}
            </div>
          </div>

          {/* Message Content */}
          <div
            className={`flex flex-col ${
              isOwnMessage ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`text-xs text-gray-400 ${
                isMobile ? "mb-1 px-1" : "mb-3 px-2"
              } flex items-center gap-2`}
            >
              <span className="font-medium">{msg.sender.name}</span>
              <span>•</span>
              <span>{formatTime(msg.createdAt)}</span>
              {isOwnMessage && (
                <CheckCheck size={12} className="text-yellow-400 ml-1" />
              )}
            </div>

            <div
              className={`${
                isMobile ? "rounded-2xl px-2 py-1.5" : "rounded-3xl px-4 py-3"
              } shadow-xl relative backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                isOwnMessage
                  ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-yellow-400/25 hover:shadow-yellow-400/40"
                  : "bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border border-gray-700/30 text-white shadow-gray-900/50"
              }`}
            >
              {msg.message && (
                <p
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } leading-relaxed break-words font-medium`}
                >
                  {msg.message}
                </p>
              )}

              {msg.imageUrl && (
                <div className={isMobile ? "mt-2" : "mt-4"}>
                  <img
                    src={msg.imageUrl || "/placeholder.svg"}
                    alt="Shared image"
                    className={`${
                      isMobile
                        ? "max-w-56 max-h-40 rounded-lg"
                        : "max-w-80 max-h-60 rounded-2xl"
                    } w-auto h-auto object-cover cursor-pointer hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    onClick={() => window.open(msg.imageUrl, "_blank")}
                  />
                </div>
              )}

              {msg.pdfUrl && (
                <div className={isMobile ? "mt-2" : "mt-4"}>
                  <a
                    href={msg.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${
                      isMobile ? "p-2 rounded-lg" : "p-4 rounded-2xl"
                    } transition-all duration-300 hover:scale-[1.02] ${
                      isOwnMessage
                        ? "bg-white/20 hover:bg-white/30 text-black backdrop-blur-sm"
                        : "bg-gray-700/50 hover:bg-gray-600/60 text-white backdrop-blur-sm"
                    }`}
                  >
                    <FileText size={isMobile ? 16 : 20} />
                    <span
                      className={`${
                        isMobile ? "text-xs" : "text-sm"
                      } font-medium`}
                    >
                      {msg.pdfName || "View PDF"}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!currentUser?.name) {
    return (
      <div className="h-[91vh] w-auto flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 md:p-10 text-center shadow-2xl max-w-sm w-full">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
          <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-2">
            Welcome to AgroLink
          </p>
          <p className="text-gray-300 text-sm md:text-base">
            Please log in to access the Community Chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[91vh] w-auto bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-md flex overflow-hidden relative">
      {/* Mobile Overlay */}
      {showSidebar && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Farmer Hover Card - Desktop Only */}
      {hoveredFarmer && !isMobile && (
        <div
          className="fixed z-50 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6 shadow-2xl max-w-sm animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            left: Math.min(hoverPosition.x + 15, window.innerWidth - 300),
            top: Math.max(hoverPosition.y - 120, 20),
            pointerEvents: "none",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-black text-lg font-bold shadow-lg ring-2 ring-yellow-400/30">
              {getInitials(hoveredFarmer.name)}
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">
                {hoveredFarmer.name}
              </h4>
              <p className="text-gray-300 text-sm">{hoveredFarmer.email}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {hoveredFarmer.role && (
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 rounded-lg p-2">
                <Briefcase size={16} className="text-yellow-400" />
                <span className="font-medium">{hoveredFarmer.role}</span>
              </div>
            )}
            {hoveredFarmer.crop && (
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 rounded-lg p-2">
                <Wheat size={16} className="text-yellow-400" />
                <span className="font-medium">{hoveredFarmer.crop}</span>
              </div>
            )}
            {hoveredFarmer.region && (
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 rounded-lg p-2">
                <MapPin size={16} className="text-yellow-400" />
                <span className="font-medium">{hoveredFarmer.region}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 rounded-lg p-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  hoveredFarmer.status === "online"
                    ? "bg-green-500 animate-pulse"
                    : "bg-yellow-500"
                }`}
              ></div>
              <span className="capitalize font-medium">
                {hoveredFarmer.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`${showSidebar ? (isMobile ? "w-56" : "w-60") : "w-0"} ${
          isMobile ? "fixed left-0 top-0 h-full z-50" : "relative"
        } transition-all duration-500 ease-in-out bg-gradient-to-b from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border-r border-gray-700/30 flex flex-col overflow-hidden shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div
          className={`${
            isMobile ? "p-4" : "p-6"
          } border-b border-gray-700/30 bg-gradient-to-r from-gray-800/50 to-gray-900/50`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className={`text-white font-bold ${
                  isMobile ? "text-lg" : "text-xl"
                }`}
              >
                AgroLink
              </h3>
              <p className="text-gray-400 text-sm">Community Hub</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUserList(!showUserList)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  showUserList
                    ? "bg-yellow-500/20 text-yellow-400 shadow-yellow-500/20"
                    : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50"
                }`}
                title="Add emoji"
              >
                <Users size={18} />
              </button>
              {isMobile && (
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                  title="Attach file"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 ${
                isMobile ? "py-2" : "py-3"
              } bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm`}
            />
          </div>
        </div>

        {/* Online Farmers */}
        {showUserList && (
          <div
            className={`flex-1 overflow-y-auto ${
              isMobile ? "p-4" : "p-6"
            } custom-scrollbar`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4
                className={`text-gray-300 ${
                  isMobile ? "text-base" : "text-lg"
                } font-semibold`}
              >
                Online Farmers
              </h4>
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                {onlineFarmers.length}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-xl animate-pulse"
                  >
                    <div
                      className={`${
                        isMobile ? "w-8 h-8" : "w-10 h-10"
                      } bg-gray-700/50 rounded-full`}
                    ></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-700/50 rounded mb-1"></div>
                      <div className="h-2 bg-gray-700/50 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {onlineFarmers.map((farmer) => (
                  <div
                    key={farmer._id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg"
                    onMouseEnter={(e) => handleFarmerHover(farmer, e)}
                    onMouseLeave={handleFarmerLeave}
                  >
                    <div className="relative">
                      <div
                        className={`${
                          isMobile ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"
                        } rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300`}
                      >
                        {getInitials(farmer.name)}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 ${
                          isMobile ? "w-2.5 h-2.5" : "w-3 h-3"
                        } rounded-full border-2 border-gray-900 ${
                          farmer.status === "online"
                            ? "bg-green-500 animate-pulse"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-white ${
                          isMobile ? "text-sm" : "text-sm"
                        } font-semibold truncate group-hover:text-yellow-400 transition-colors`}
                      >
                        {farmer.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {farmer.crop || farmer.role || "Farmer"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div
          className={`bg-gradient-to-r  h-14  from-yellow-400 via-yellow-500 to-yellow-600 text-black ${
            isMobile ? "p-3" : "p-6"
          } flex items-center justify-between shadow-2xl`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
            >
              <Menu size={isMobile ? 18 : 22} />
            </button>
            <div>
              <h2 className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>
                🌾 Community Chat
              </h2>
              <p
                className={`text-black/70 ${
                  isMobile ? "text-xs" : "text-sm"
                } font-medium`}
              >
                {onlineFarmers.length} farmers online • Welcome{" "}
                {userData?.name || currentUser.name}
              </p>
            </div>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                <Phone size={22} />
              </button>
              <button className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                <Video size={22} />
              </button>
              <button className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                <Settings size={22} />
              </button>
              <button className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                <MoreVertical size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className={`flex-1 overflow-y-auto ${
            isMobile ? "p-3" : "p-8"
          } bg-gradient-to-b from-black/95 via-gray-900/90 to-black/95 custom-scrollbar`}
          style={{ scrollBehavior: "auto" }}
        >
          <div className={`${isMobile ? "max-w-full" : "max-w-5xl"} mx-auto`}>
            {(searchQuery ? filteredMessages : messages).map((msg, index) =>
              renderMessage(msg, index)
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                className={`flex justify-start ${isMobile ? "mb-4" : "mb-8"}`}
              >
                <div
                  className={`bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 backdrop-blur-sm border border-gray-600/30 ${
                    isMobile ? "rounded-2xl px-3 py-2" : "rounded-3xl px-6 py-4"
                  } shadow-xl`}
                >
                  <div className="flex space-x-2 items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span
                      className={`text-gray-400 ${
                        isMobile ? "text-xs" : "text-xs"
                      } ml-2`}
                    >
                      Someone is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className={`border-t border-gray-700/30 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl ${
            isMobile ? "p-2" : "p-4"
          }`}
        >
          <div className={`${isMobile ? "max-w-full" : "max-w-5xl"} mx-auto`}>
            <form onSubmit={handleSend} className="space-y-2">
              {/* File Preview */}
              {file && (
                <div
                  className={`flex items-center gap-3 ${
                    isMobile ? "p-2" : "p-4"
                  } bg-gradient-to-r from-gray-800/50 to-gray-700/50 ${
                    isMobile ? "rounded-xl" : "rounded-2xl"
                  } border border-gray-600/30 backdrop-blur-sm`}
                >
                  {file.type.startsWith("image/") ? (
                    <ImageIcon
                      size={isMobile ? 16 : 20}
                      className="text-yellow-400"
                    />
                  ) : (
                    <FileText
                      size={isMobile ? 16 : 20}
                      className="text-yellow-400"
                    />
                  )}
                  <span
                    className={`text-white ${
                      isMobile ? "text-xs" : "text-sm"
                    } flex-1 truncate font-medium`}
                  >
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                  >
                    <X size={isMobile ? 14 : 18} />
                  </button>
                </div>
              )}

              {/* Input Row */}
              <div
                className={`flex  ${isMobile ? "gap-1" : "gap-2"} items-end`}
              >
                <div className="flex-1 relative ">
                  <textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                    className={`w-full resize-none  border border-gray-600/30 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white ${
                      isMobile
                        ? "rounded-xl px-3 py-2 text-sm"
                        : "rounded-2xl px-6 py-4 text-base"
                    } focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 max-h-32 placeholder-gray-400 font-medium`}
                    placeholder="Type your message..."
                    rows={1}
                    style={{ minHeight: isMobile ? "40px" : "60px" }}
                  />
                </div>

                {/* Action Buttons */}
                <div className={`flex  ${isMobile ? "gap-1" : "gap-3"}`}>
                  {!isMobile && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                          showEmojiPicker
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50"
                        }`}
                        title="Add emoji"
                      >
                        <Smile size={24} />
                      </button>

                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <div className="emoji-picker-container absolute bottom-full right-0 mb-2 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-4 shadow-2xl w-80 max-h-64 overflow-y-auto custom-scrollbar">
                          <div className="grid grid-cols-8 gap-2">
                            {emojis.map((emoji, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleEmojiClick(emoji)}
                                className="p-2 text-2xl hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-110"
                                title={emoji}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`${
                      isMobile ? "p-2" : "p-4"
                    } text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 ${
                      isMobile ? "rounded-xl" : "rounded-2xl"
                    } transition-all duration-300 hover:scale-105`}
                    title="Attach file"
                  >
                    <Paperclip size={isMobile ? 18 : 24} />
                  </button>

                  <button
                    type="submit"
                    disabled={(!message.trim() && !file) || isSending}
                    className={`${
                      isMobile ? "p-2" : "p-4"
                    } bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black ${
                      isMobile ? "rounded-xl" : "rounded-2xl"
                    } hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-yellow-400/30 hover:scale-105 font-bold`}
                    title="Send message"
                  >
                    {isSending ? (
                      <Loader2
                        size={isMobile ? 18 : 24}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={isMobile ? 18 : 24} />
                    )}
                  </button>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </form>
          </div>
        </div>

        {/* Scroll to Bottom Button */}
        {!isAtBottom && (
          <button
            onClick={() => {
              scrollToBottom();
              setTimeout(() => setIsAtBottom(true), 100);
            }}
            className={`absolute ${
              isMobile ? "bottom-20 right-4 p-3" : "bottom-40 right-10 p-4"
            } bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-full shadow-2xl transition-all duration-300 z-10 hover:from-yellow-500 hover:to-yellow-700 hover:scale-110 hover:shadow-yellow-400/40`}
            title="Scroll to bottom"
          >
            <svg
              className={`${isMobile ? "w-4 h-4" : "w-6 h-6"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
