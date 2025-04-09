import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const FavoritesList = () => {
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
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaHeart className="text-pink-500" />
        Favoris des clients
      </h2>

      {favoritesByUser.length === 0 ? (
        <p className="text-gray-500">Aucun favoris trouvé pour les utilisateurs.</p>
      ) : (
        favoritesByUser.map(({ email, favorites }) => (
          <div
            key={email}
            className="mb-6 border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              📧 {decodeURIComponent(email)}
            </h4>

            {favorites.length === 0 ? (
              <p className="text-gray-500">Pas de produits favoris.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {favorites.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2 border rounded shadow-sm"
                  >
                    <img
                      src={item.image01}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded"
                    />
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
  );
};

export default FavoritesList;
