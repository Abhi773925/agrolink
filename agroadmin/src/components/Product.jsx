import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/products"
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
    <div className="flex justify-center items-center min-h-screen bg-black/95">
      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-3xl shadow-lg p-4 flex flex-col justify-center items-center hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-200"
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg mb-3 border border-gray-700/50"
              />
              <h2 className="text-lg font-bold text-yellow-400 text-center">
                {item.name}
              </h2>
              <p className="text-sm text-gray-300 text-center mb-2">
                {item.description || "No description provided"}
              </p>
              <p className="text-xl font-semibold text-white mb-4">
                ₹{item.price}
              </p>
              {item.quantity >= 1 ? (
                <button
                  onClick={() => handleAddToCart(item)}
                  
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-3xl w-fit hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg shadow-yellow-400/20"
                >
                Admin != Stock
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-700/50 text-gray-400 font-semibold px-4 py-2 rounded-3xl w-fit cursor-not-allowed border border-gray-600/50"
                >
                  Item not Available
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;