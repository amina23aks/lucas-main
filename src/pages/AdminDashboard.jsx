import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaEnvelopeOpenText, FaShoppingCart, FaHeart } from "react-icons/fa";

const AdminDashboard = () => {
  const [favoritesByUser, setFavoritesByUser] = useState([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const favoritesKeys = allKeys.filter((key) => key.startsWith("favorites_"));

    const usersData = favoritesKeys.map((key) => {
      const email = key.replace("favorites_", "");
      const favorites = JSON.parse(localStorage.getItem(key));
      return { email, favorites };
    });

    setFavoritesByUser(usersData);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard</h2>
      <p className="text-gray-600">
        Bienvenue dans le panneau d'administration ! Utilisez le menu pour gérer votre site.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
              <FaBoxOpen className="text-green-600" />
              Produits
            </div>
          </div>
          <p className="text-sm text-gray-500">Gérer et mettre à jour les produits</p>
        </div>

        {/* Messages */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-2">
            <FaEnvelopeOpenText className="text-yellow-500" />
            Messages de contact
          </div>
          <p className="text-sm text-gray-500">Voir les messages des utilisateurs</p>
        </div>

        {/* Orders */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
              <FaShoppingCart className="text-red-500" />
              Commandes
            </div>
          </div>
          <p className="text-sm text-gray-500">Cliquez pour voir toutes les commandes</p>
        </div>
      </div>

      {/* ✅ Favorites by User Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaHeart className="text-pink-500" />
          Favoris des clients
        </h3>

        {favoritesByUser.length === 0 ? (
          <p className="text-gray-500">Aucun favoris trouvé pour les utilisateurs.</p>
        ) : (
          favoritesByUser.map(({ email, favorites }) => (
            <div key={email} className="mb-6 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">
                📧 {email}
              </h4>
              {favorites.length === 0 ? (
                <p className="text-gray-500">Pas de produits favoris.</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {favorites.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 p-2 border rounded shadow-sm">
                      <img src={item.image01} alt={item.title} className="w-14 h-14 object-cover rounded" />
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <p className="text-sm text-gray-500">{item.price} DA</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
