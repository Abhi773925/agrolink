import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddToCart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  const handleCheckout = () => {
    // Redirect to AgroLink user site
    window.location.href = "https://agrolink-ag.vercel.app/";
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`https://agrolink-5ok6.onrender.com/api/users/cart/${id}`);
        setItem(res.data);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      }
    };

    fetchItem();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!item) return <p className="text-center text-[#FFFFFF] mt-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#111827] py-10 px-4 text-[#FFFFFF]">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-[#FFFFFF] hover:text-yellow-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-[#1F2937]/80 backdrop-blur-lg border border-[#374151]/10 rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">

            {/* Image Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 p-6 flex items-center justify-center">
              <div className="relative">
                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.name}
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl border-4 border-[#374151] shadow-yellow-400/30 shadow-lg"
                />
                {item.quantity < 5 && item.quantity > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-[#FFFFFF] px-3 py-1 rounded-full text-sm font-semibold shadow">
                    Only {item.quantity} left!
                  </div>
                )}
                {item.quantity === 0 && (
                  <div className="absolute inset-0 bg-[#111827] bg-opacity-60 rounded-2xl flex items-center justify-center">
                    <span className="text-[#FFFFFF] font-bold text-xl">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-extrabold text-[#FFFFFF] mb-4">{item.name}</h1>
              <p className="text-[#D1D5DB] mb-6">{item.description}</p>

              <div className="text-3xl font-bold text-[#22C55E] mb-4">
                ₹{item.price}
                <span className="text-[#D1D5DB] text-base ml-2">/unit</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#22C55E]/10 border border-[#374151] rounded-lg p-4">
                  <p className="text-[#D1D5DB] text-sm">Quantity</p>
                  <p className="text-lg font-bold text-[#D1D5DB]">{item.quantity}</p>
                </div>
                <div className="bg-[#22C55E]/10 border border-[#374151] rounded-lg p-4">
                  <p className="text-[#D1D5DB] text-sm">Region</p>
                  <p className="text-lg font-bold text-[#D1D5DB]">{item.region}</p>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-4">
                {item.quantity >= 1 ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                  >
                    Check for the User Site to Complete Purchase
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-700 text-[#FFFFFF] font-bold py-3 px-6 rounded-xl cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Assurance Card */}
              <div className="mt-6 bg-[#22C55E]/5 border border-[#FACC15]/20 p-4 rounded-xl text-sm">
                <p className="font-medium text-[#D1D5DB]">✅ Quality Guarantee</p>
                <p className="text-[#D1D5DB]">
                  Sourced directly from verified farmers with freshness ensured.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
