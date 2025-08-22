import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="flex justify-center items-center min-h-screen bg-[#111827]">
      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.length === 0 && (
            <p className="col-span-full text-center text-[#D1D5DB]">
              No products available
            </p>
          )}
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] backdrop-blur-md border border-[#374151] rounded-3xl shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200"
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-xl mb-3 border border-[#374151]/50"
              />
              <h2 className="text-lg font-bold text-[#FFFFFF] text-center">
                {item.name}
              </h2>
              <p className="text-sm text-[#D1D5DB] text-center mb-2">
                {item.description || "No description provided"}
              </p>
              <p className="text-xl font-semibold text-[#FFFFFF] mb-4">
                ₹{item.price}
              </p>
              {item.quantity >= 1 ? (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-[#D1D5DB] font-bold px-4 py-2 rounded-3xl w-fit hover:from-green-500 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/30"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="bg-[#111827] text-[#D1D5DB] font-semibold px-4 py-2 rounded-3xl w-fit cursor-not-allowed border border-gray-600/50"
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
