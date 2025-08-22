import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCrop = () => {
  const [crop, setCrop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchCrop();
  }, []);

  const fetchCrop = async () => {
    setLoading(true);
    try {
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `https://agrolink-5ok6.onrender.com/api/users/mycrop?email=${encodeURIComponent(email)}`
      );
      setCrop(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `https://agrolink-5ok6.onrender.com/api/users/deletecrop?item=${encodeURIComponent(item.name)}`
      );
      fetchCrop();
    } catch (error) {
      console.error(error);
    }
  };

  const handleManage = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      region: item.region,
      price: item.price,
      quantity: item.quantity,
      description: item.description,
      image: item.image,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://agrolink-5ok6.onrender.com/api/users/updateitem?listingId=${selectedItem._id}`,
        formData
      );
      setSelectedItem(null);
      fetchCrop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-[#111827]">

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] backdrop-blur-md border border-[#374151] p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-[#FFFFFF]">Manage {selectedItem.name}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {["name","region","price","quantity","description","image"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 text-[#D1D5DB]">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === "description" ? (
                    <textarea
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full bg-[#374151] border border-[#374151]/50 text-[#FFFFFF] p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]/50"
                    />
                  ) : (
                    <input
                      type={field === "price" || field === "quantity" ? "number" : "text"}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full bg-[#374151] border border-[#374151]/50 text-[#FFFFFF] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E]/50"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#374151] text-[#D1D5DB] px-4 py-2 rounded-lg hover:bg-[#374151]/50 border border-[#374151]/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-[#D1D5DB] font-bold px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-700 shadow-lg shadow-green-500/30"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Crops list */}
      {loading ? (
        <div className="text-center mt-10 text-[#FFFFFF]">Loading crops...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl p-4">
          {crop.length === 0 ? (
            <p className="col-span-full text-center text-[#D1D5DB]">No crops available</p>
          ) : (
            crop.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#111827] backdrop-blur-md border border-[#374151] shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-xl mb-3 border border-[#374151]/50"
                />
                <h2 className="text-lg font-bold text-[#FFFFFF]">{item.name}</h2>
                <p className="text-sm text-[#D1D5DB] text-center mb-2">{item.description}</p>
                <p className="text-xl font-semibold text-[#FFFFFF] mb-4">₹{item.price}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-[#D1D5DB] font-bold px-4 py-2 rounded-xl hover:from-green-500 hover:to-green-700 shadow-lg shadow-green-500/30"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleManage(item)}
                    className="border-2 border-[#374151]/50 text-[#FFFFFF] px-4 py-2 rounded-xl hover:bg-green-500/10 hover:border-[#374151]"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyCrop;
