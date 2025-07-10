const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, email, role, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, role, phone, password });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to save the user", error: error.message });
  }
};

const getUser= async(req,res)=>{
    const {email,password}=req.body;
    try {
       const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: "User not found" });
// Add this check
if (user.password !== password) return res.status(401).json({ message: "Invalid password" });

return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        return res.status(500).json({mesaage:"Bad request"});
    }
}
module.exports = { createUser ,getUser};
