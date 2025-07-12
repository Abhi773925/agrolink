const Message = require("../models/messagemodel");

exports.createMessage = async (req, res) => {
  try {
    console.log("🟡 Raw req.body:", req.body);
    console.log("🟡 Raw req.file:", req.file);

    const { message, sender } = req.body;
    if (!sender) return res.status(400).json({ error: "Sender is required" });

    const parsedSender = typeof sender === "string" ? JSON.parse(sender) : sender;

    const file = req.file;

    const newMsg = await Message.create({
      message: message || "",
      sender: parsedSender,
      imageUrl: file?.mimetype?.startsWith("image/") ? file.path : null,
      pdfUrl: file?.mimetype === "application/pdf" ? file.path : null,
      pdfName: file?.mimetype === "application/pdf" ? file.originalname : null,
    });

    return res.status(201).json(newMsg);
  } catch (err) {
    console.error("❌ Message creation error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
    