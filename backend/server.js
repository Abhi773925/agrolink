const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/agrolink")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
const UserRoute = require("./routes/UserRoute");
const ProfileRoute = require("./routes/ProfileRoute");
const ListingRoute = require("./routes/ListingRoute");
const ProductRoute = require("./routes/ProductRoute");
const AddToCartRoute = require("./routes/AddToCartRoute");
const MyCropRoute = require("./routes/MyCropRoute");
const CheckoutRoute = require("./routes/CheckoutRoute");
const OrderRoutes = require("./routes/orderRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const MessageRoutes = require("./routes/messageRoutes");
const MyOrderRoute=require('./routes/MyOrderRoute');

app.use("/api", MessageRoutes);
app.use("/api/users", UserRoute);
app.use("/api/users", ProfileRoute);
app.use("/api/users", ListingRoute);
app.use("/api/users", ProductRoute);
app.use("/api/users", AddToCartRoute);
app.use("/api/users", MyCropRoute);
app.use("/api/users", CheckoutRoute);
app.use("/api/users", OrderRoutes);
app.use("/api/users", PaymentRoutes);
app.use("/api/users",MyOrderRoute);
app.get("/", (req, res) => {
  res.json({ message: "Server is running", database: "Connected to MongoDB" });
});

// Socket.IO for Real-time Chat
io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
