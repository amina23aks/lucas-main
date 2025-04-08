import React, { useEffect, useState } from "react";
import "../styles/admin.css";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(stored);
  }, []);

  const handleDelete = (id) => {
    const filtered = comments.filter((comment) => comment.id !== id);
    setComments(filtered);
    localStorage.setItem("comments", JSON.stringify(filtered));
  };

  const filteredComments = comments.filter((comment) =>
    comment.productName?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-2">📝 Gérer les Commentaires</h2>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrer par nom de produit..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>

      {filteredComments.length === 0 ? (
        <p className="text-gray-500">Aucun commentaire trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {filteredComments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-md"
            >
              <p><strong>🧁 Produit:</strong> {comment.productName || comment.productId}</p>
              <p><strong>👤 Nom:</strong> {comment.name}</p>
              <p><strong>📧 Email:</strong> {comment.email}</p>
              <p><strong>💬 Message:</strong> {comment.message}</p>
              <p className="text-sm text-gray-500">
                🕒 {new Date(comment.created_at).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(comment.id)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                🗑️ Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminComments;
