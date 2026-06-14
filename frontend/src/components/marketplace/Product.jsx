import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://agrolink-5ok6.onrender.com/api/users/products"
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch products");
    }
  };

  const handleAddToCart = (item) => {
    console.log("Item added to cart:", item.name);
    navigate(`/cart/${item._id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Marketplace</h1>
          <p className="mt-1 text-sm text-gray-600">Browse available crops and purchase directly from verified listings.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.length === 0 && <p className="col-span-full rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">No products available.</p>}
          {products.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <img src={item.image || "https://via.placeholder.com/400x250"} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-base font-semibold text-gray-900">{item.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description || "No description provided."}</p>
                <p className="mt-3 text-lg font-semibold text-gray-900">₹{item.price}</p>
                <p className="mt-1 text-xs text-gray-500">Stock: {item.quantity}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.quantity < 1}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {item.quantity >= 1 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
