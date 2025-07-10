const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "agrolink_chats",
      resource_type: isPdf ? "raw" : "image",
      format: isPdf ? "pdf" : undefined,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
