import { useState } from "react";

const Listing = () => {
  const [formData, setFormData] = useState({
    listingId: "",
    email: "",
    name: "",
    quantity: "",
    price: "",
    region: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("https://agrolink-5ok6.onrender.com/api/users/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage({ type: "success", text: "Listing created successfully." });
      setFormData({
        listingId: "",
        email: "",
        name: "",
        quantity: "",
        price: "",
        region: "",
        description: "",
        image: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to create listing." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create listing</h1>
          <p className="mt-1 text-sm text-gray-600">Add crop details for buyers in the marketplace.</p>
        </header>
        {message && (
          <p
            className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {[
            ["Listing ID", "listingId", "number", "Unique ID"],
            ["Email", "email", "email", "example@mail.com"],
            ["Product Name", "name", "text", "e.g. Basmati Rice"],
            ["Region", "region", "text", "e.g. Bihar"],
            ["Quantity", "quantity", "number", "Available quantity"],
            ["Price", "price", "number", "Price per unit"],
            ["Image URL", "image", "url", "https://example.com/image.jpg"],
          ].map(([label, name, type, placeholder]) => (
            <div key={name} className={name === "image" ? "sm:col-span-2" : ""}>
              <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={placeholder}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe crop quality, harvesting details, and packaging."
            />
          </div>
          {formData.image && (
            <div className="sm:col-span-2">
              <img src={formData.image} alt="Preview" className="h-32 w-32 rounded-lg border border-gray-200 object-cover" onError={(e) => (e.target.style.display = "none")} />
            </div>
          )}
          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating..." : "Create Listing"}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  listingId: "",
                  email: "",
                  name: "",
                  quantity: "",
                  price: "",
                  region: "",
                  description: "",
                  image: "",
                })
              }
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Listing
