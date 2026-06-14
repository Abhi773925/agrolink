import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddToCart = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [error, setError] = useState("")

  const handleCheckout = (item) => {
    navigate(`/checkout/${item.listingId}`)
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `https://agrolink-5ok6.onrender.com/api/users/cart/${id}`
        )
        setItem(res.data)
      } catch (err) {
        setError("Failed to fetch product")
        console.error(err)
      }
    }
    fetchItem()
  }, [id])

  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;
  if (!item) return <p className="mt-8 text-center text-gray-600">Loading...</p>;

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to marketplace
        </button>

        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="relative">
                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.name}
                  className="h-80 w-full rounded-xl border border-gray-200 object-cover"
                />
                {item.quantity < 5 && item.quantity > 0 && (
                  <div className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                    Only {item.quantity} left!
                  </div>
                )}
                {item.quantity === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-900/50">
                    <span className="text-sm font-semibold text-white">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{item.name}</h1>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>

                <div className="mt-4 text-2xl font-semibold text-gray-900">
                  ₹{item.price}
                  <span className="ml-1 text-sm text-gray-500">/ unit</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-gray-500">Quantity</p>
                    <p className="mt-1 font-medium text-gray-900">{item.quantity}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-gray-500">Region</p>
                    <p className="mt-1 font-medium text-gray-900">{item.region}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {item.quantity >= 1 ? (
                  <button
                    onClick={() => handleCheckout(item)}
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-700"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Quality checked listing from verified farmer network.
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AddToCart
