const Profile = require('../models/Profile');
const User = require('../models/User');

// GET: Get or Create Profile
const getprofile = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    let profile = await Profile.findOne({ email });

    // If no profile found, check user collection and create profile
    if (!profile) {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found in User collection" });
      }

      const newProfile = new Profile({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        crop: user.crop || '',
        region: user.region || ''
      });

      await newProfile.save();
      return res.status(201).json(newProfile);  
    }

    return res.status(200).json(profile);

  } catch (error) {
    console.error("Error in getprofile:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// PUT: Update Profile
const updateProfile = async (req, res) => {
  const { email, role, phone, crop, region } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingProfile = await Profile.findOne({ email });

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedData = {
      role: role || existingProfile.role,
      phone: phone || existingProfile.phone,
      crop: crop || existingProfile.crop,
      region: region || existingProfile.region,
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ GET: Get all user profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 }); // optional sort by newest
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching all profiles:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getprofile,
  updateProfile,
  getAllProfiles, // ← Exported
};
