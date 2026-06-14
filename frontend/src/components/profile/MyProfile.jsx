import { Edit3, Mail, MapPin, Phone, Plus, Save, User, Wheat } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ role: "", phone: "", crop: "", region: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (!parsedUser?.email) return;

    fetch(`https://agrolink-5ok6.onrender.com/api/users/profile?email=${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setFormData({
          role: data.role || "",
          phone: data.phone || "",
          crop: data.crop || "",
          region: data.region || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleUpdate = async () => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (!parsedUser?.email) {
      alert("User email not found");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("https://agrolink-5ok6.onrender.com/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsedUser.email, ...formData }),
      });

      if (response.ok) {
        setUserData((prev) => ({ ...prev, ...formData }));
        setShowModal(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return (
      <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600 shadow-sm">
          Loading profile...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{userData.name}</h1>
                <p className="text-sm text-gray-600">{userData.role || "Agricultural Professional"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex h-10 items-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/listing")}
                className="inline-flex h-10 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Listing
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-2 flex items-center text-sm font-medium text-gray-900">
              <Mail className="mr-2 h-4 w-4 text-green-700" />
              {userData.email}
            </p>
          </article>
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="mt-2 flex items-center text-sm font-medium text-gray-900">
              <Phone className="mr-2 h-4 w-4 text-green-700" />
              {userData.phone || "Not provided"}
            </p>
          </article>
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Primary Crops</p>
            <p className="mt-2 flex items-center text-sm font-medium text-gray-900">
              <Wheat className="mr-2 h-4 w-4 text-green-700" />
              {userData.crop || "Not specified"}
            </p>
          </article>
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Region</p>
            <p className="mt-2 flex items-center text-sm font-medium text-gray-900">
              <MapPin className="mr-2 h-4 w-4 text-green-700" />
              {userData.region || "Not specified"}
            </p>
          </article>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Update Profile</h2>
            <div className="space-y-3">
              {[
                ["Role", "role"],
                ["Phone", "phone"],
                ["Crop", "crop"],
                ["Region", "region"],
              ].map(([label, field]) => (
                <div key={field}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    value={formData[field]}
                    onChange={(event) => setFormData((prev) => ({ ...prev, [field]: event.target.value }))}
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex h-10 items-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="inline-flex h-10 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;