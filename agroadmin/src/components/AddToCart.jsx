import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddToCart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  const handleCheckout = (item) => {

    navigate("/");
    window.location.href = "http://localhost:5173/";

  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/cart/${id}`);
        setItem(res.data);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      }
    };

    fetchItem();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!item) return <p className="text-center text-white mt-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-black py-10 px-4 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-yellow-400 hover:text-yellow-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-black/80 backdrop-blur-lg border border-yellow-400/10 rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">

            {/* Image */}
            <div className="md:w-1/2 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 p-6 flex items-center justify-center">
              <div className="relative">
                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.name}
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl border-4 border-yellow-400/30 shadow-yellow-400/30 shadow-lg"
                />
                {item.quantity < 5 && item.quantity > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    Only {item.quantity} left!
                  </div>
                )}
                {item.quantity === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">{item.name}</h1>
              <p className="text-gray-300 mb-6">{item.description}</p>

              <div className="text-3xl font-bold text-green-400 mb-4">
                ₹{item.price}
                <span className="text-gray-400 text-base ml-2">/unit</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm">Quantity</p>
                  <p className="text-lg font-bold text-yellow-200">{item.quantity}</p>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm">Region</p>
                  <p className="text-lg font-bold text-yellow-200">{item.region}</p>
                </div>
              </div>

              {/* Buy Now */}
              <div className="mt-4 disabled ">
                {item.quantity >= 1 ? (
                  <button
                    onClick={() => handleCheckout(item)}

                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/30 disabled"
                  >
                    Check for the User Site to Complete Purchase
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-xl cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Assurance */}
              <div className="mt-6 bg-yellow-400/5 border border-yellow-500/20 p-4 rounded-xl text-sm">
                <p className="font-medium text-yellow-300">✅ Quality Guarantee</p>
                <p className="text-yellow-200">Sourced directly from verified farmers with freshness ensured.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
