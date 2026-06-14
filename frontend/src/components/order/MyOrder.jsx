import { AlertCircle, Calendar, CheckCircle2, Package, RefreshCw, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const getStatusClass = (status = "") => {
  const value = status.toLowerCase();
  if (value === "delivered") return "bg-green-50 text-green-700 border-green-200";
  if (value === "shipped") return "bg-amber-50 text-amber-700 border-amber-200";
  if (value === "processing") return "bg-blue-50 text-blue-700 border-blue-200";
  if (value === "cancelled") return "bg-red-50 text-red-700 border-red-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Date(value).toLocaleString();
};

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = localStorage.getItem("email");

  const fetchOrders = async () => {
    if (!userEmail) {
      setError("User email not found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://agrolink-5ok6.onrender.com/api/users/getorder/${userEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : data ? [data] : [];
      setOrders(normalized);
      setSelectedOrderId((prev) => prev || normalized[0]?._id || null);
    } catch (fetchError) {
      setError(fetchError.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const selectedOrder = useMemo(
    () => orders.find((order) => order._id === selectedOrderId) || orders[0],
    [orders, selectedOrderId]
  );

  if (loading) {
    return (
      <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600 shadow-sm">
          Loading orders...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-2 h-5 w-5 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 inline-flex h-10 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-600">Review status, seller details, shipping address, and payment records.</p>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600 shadow-sm">
            No orders found.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Order List</div>
                <div className="space-y-2">
                  {orders.map((order) => (
                    <button
                      key={order._id}
                      onClick={() => setSelectedOrderId(order._id)}
                      className={`w-full rounded-lg border p-3 text-left ${
                        selectedOrder?._id === order._id
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="mt-1 text-xs text-gray-600">{formatDate(order.orderDate)}</p>
                      <div className={`mt-2 inline-flex rounded border px-2 py-0.5 text-xs font-medium ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-gray-900">₹{order.orderPrice?.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <article className="lg:col-span-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
                  <p className="mt-1 text-sm text-gray-600">Placed on {formatDate(selectedOrder.orderDate)}</p>
                </div>
                <div className={`inline-flex rounded border px-3 py-1 text-sm font-medium ${getStatusClass(selectedOrder.orderStatus)}`}>
                  {selectedOrder.orderStatus}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Product</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">{selectedOrder.productDetails?.name || "Not available"}</p>
                  <p className="mt-1 text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                  <p className="mt-1 text-sm text-gray-600">Price: ₹{selectedOrder.orderPrice?.toLocaleString()}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Seller</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">{selectedOrder.sellerDetails?.name || "Not available"}</p>
                  <p className="mt-1 text-sm text-gray-600">{selectedOrder.sellerDetails?.email || "-"}</p>
                  <p className="mt-1 text-sm text-gray-600">{selectedOrder.sellerDetails?.phone || "-"}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Shipping Address</p>
                  <p className="mt-2 text-sm text-gray-900">{selectedOrder.address}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {selectedOrder.city || ""} {selectedOrder.state || ""} {selectedOrder.country || ""} {selectedOrder.pincode || ""}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">Phone: {selectedOrder.phone}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Payment</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">{selectedOrder.paymentMethod}</p>
                  <p className="mt-1 text-sm text-gray-600">Total: ₹{selectedOrder.orderPrice?.toLocaleString()}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Timeline</p>
                  <p className="mt-2 flex items-center text-sm text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-green-700" />
                    Ordered: {formatDate(selectedOrder.orderDate)}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-700">
                    <Truck className="mr-2 h-4 w-4 text-green-700" />
                    Shipped: {formatDate(selectedOrder.shippedDate)}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-700">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-700" />
                    Delivered: {formatDate(selectedOrder.deliveredDate)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Raw References</p>
                <p className="mt-2 break-all text-xs text-gray-600">Order ID: {selectedOrder._id}</p>
                <p className="mt-1 break-all text-xs text-gray-600">Product ID: {typeof selectedOrder.product === "object" ? selectedOrder.product._id : selectedOrder.product}</p>
                <p className="mt-1 break-all text-xs text-gray-600">Tracking Number: {selectedOrder.trackingNumber || "Not assigned"}</p>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrder;