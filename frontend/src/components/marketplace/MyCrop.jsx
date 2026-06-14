import axios from "axios";
import { useEffect, useState } from "react";

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
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Crops</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your active listings and update stock details.</p>
        </header>

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Manage {selectedItem.name}</h2>
              <form onSubmit={handleUpdate} className="space-y-3">
                {["name", "region", "price", "quantity", "description", "image"].map((field) => (
                  <div key={field}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    {field === "description" ? (
                      <textarea
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <input
                        type={field === "price" || field === "quantity" ? "number" : "text"}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex h-10 items-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="inline-flex h-10 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">Loading crops...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {crop.length === 0 ? (
              <p className="col-span-full rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">No crops available.</p>
            ) : (
              crop.map((item) => (
                <article key={item._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <img src={item.image || "https://via.placeholder.com/300x200"} alt={item.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h2 className="text-base font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description}</p>
                    <p className="mt-3 text-lg font-semibold text-gray-900">₹{item.price}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleDelete(item)}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleManage(item)}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-green-700 text-sm font-medium text-white hover:bg-green-800"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCrop;
