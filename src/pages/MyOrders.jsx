import React, { useEffect, useState } from "react";
import "../styles/admin.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const saveOrders = (newOrders) => {
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  const deleteOrder = (id) => {
    const filtered = orders.filter((order) => order.id !== id);
    saveOrders(filtered);
  };

  const startEditing = (order) => {
    setEditingOrder(order.id);
    setFormData({
      name: order.shipping_address.name,
      email: order.shipping_address.email,
      phone: order.shipping_address.phone,
      city: order.shipping_address.city,
    });
  };

  const saveEdit = (id) => {
    const updated = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            shipping_address: {
              ...order.shipping_address,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              city: formData.city,
            },
          }
        : order
    );
    saveOrders(updated);
    setEditingOrder(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Commandes</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande trouvée.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-5 bg-white rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-2 space-y-1">
              <p><strong>📄 ID:</strong> {order.id}</p>
              <p><strong>🕒 Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>💰 Total:</strong> {order.total_amount} DA</p>

              {editingOrder === order.id ? (
                <>
                  <input
                    className="p-2 rounded w-full mt-2 border border-gray-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nom"
                  />
                  <input
                    className="p-2 rounded w-full mt-2 border border-gray-300"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                  />
                  <input
                    className="p-2 rounded w-full mt-2 border border-gray-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Téléphone"
                  />
                  <input
                    className="p-2 rounded w-full mt-2 border border-gray-300"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ville"
                  />
                  <button
                    onClick={() => saveEdit(order.id)}
                    className="btn-green mt-3"
                  >
                    💾 Enregistrer
                  </button>
                </>
              ) : (
                <>
                  <p><strong>👤 Nom:</strong> {order.shipping_address.name}</p>
                  <p><strong>📧 Email:</strong> {order.shipping_address.email}</p>
                  <p><strong>📞 Téléphone:</strong> {order.shipping_address.phone}</p>
                  <p><strong>🏙️ Ville:</strong> {order.shipping_address.city}</p>
                </>
              )}
            </div>

            <div className="mt-4">
              <strong>🧾 Articles:</strong>
              <ul className="list-disc pl-6 mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.title} — {item.price} DA
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => startEditing(order)}
                className="btn-yellow"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
                className="btn-red"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
