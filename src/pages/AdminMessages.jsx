import React, { useEffect, useState } from "react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(stored);
  }, []);

  const deleteMessage = (id) => {
    const filtered = messages.filter((msg) => msg.id !== id);
    localStorage.setItem("messages", JSON.stringify(filtered));
    setMessages(filtered);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">📬 Messages de contact</h2>

      {messages.length === 0 ? (
        <p className="text-muted">Aucun message trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="p-4 bg-white border rounded-lg shadow-sm space-y-1"
            >
              <p><strong>Nom:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="text-sm text-gray-500">
                <strong>Envoyé le:</strong>{" "}
                {new Date(msg.created_at).toLocaleString()}
              </p>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMessages;
