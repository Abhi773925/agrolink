import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const fetchCrop = async () => {
    setLoading(true);
    try {
    //   const email = localStorage.getItem("email");
      const response = await axios.get(
        `http://localhost:5000/api/users/mycrop?email=${encodeURIComponent(email)}`
      );
      setCrop(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/deletecrop?item=${encodeURIComponent(
          item.name
        )}`
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
        `http://localhost:5000/api/users/updateitem?listingId=${selectedItem._id}`,
        formData
      );
      setSelectedItem(null);
      fetchCrop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-black/95">

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">Manage {selectedItem.name}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Region</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="bg-gray-800/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700/50 border border-gray-700/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 shadow-lg shadow-yellow-400/20"
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
        <div className="text-center mt-10 text-yellow-400">Loading crops...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl p-4">
          {crop.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">No crops available</p>
          ) : (
            crop.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-900/95 backdrop-blur-md border border-gray-800/50 shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-200"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-xl mb-3 border border-gray-700/50"
                />
                <h2 className="text-lg font-bold text-yellow-400">{item.name}</h2>
                <p className="text-sm text-gray-300 text-center mb-2">{item.description}</p>
                <p className="text-xl font-semibold text-white mb-4">₹{item.price}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl hover:from-yellow-500 hover:to-yellow-700 shadow-lg shadow-yellow-400/20"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleManage(item)}
                    className="border-2 border-yellow-400/50 text-yellow-400 px-4 py-2 rounded-xl hover:bg-yellow-400/10 hover:border-yellow-400"
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