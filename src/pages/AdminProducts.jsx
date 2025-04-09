import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import "../styles/Contact.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    image01: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const saveToStorage = (items) => {
    localStorage.setItem("products", JSON.stringify(items));
    setProducts(items);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image01: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.image01) return;

    if (editingId !== null) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
      saveToStorage(updated);
      setEditingId(null);
      setNotification("Produit mis à jour avec succès !");
    } else {
      const newProduct = { ...form, id: Date.now() };
      saveToStorage([...products, newProduct]);
      setNotification("Produit ajouté avec succès !");
    }

    setTimeout(() => {
      setNotification("");
    }, 3000);

    setForm({
      id: null,
      title: "",
      price: "",
      category: "",
      image01: "",
      description: "",
    });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveToStorage(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gérer Produits</h2>

      {/* ✅ Notification */}
      {notification && (
        <div
          style={{
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
            padding: "10px 16px",
            borderRadius: "8px",
            marginBottom: "1rem",
            border: "1px solid #badbcc",
          }}
        >
          {notification}
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="contact-form" style={{ marginBottom: "2rem" }}>
        {/* Title */}
        <div className="input-container">
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
          <label>Nom du produit</label>
        </div>

        {/* Price */}
        <div className="input-container">
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
          <label>Prix</label>
        </div>

        {/* Category */}
        <div className="input-container">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="p-2 rounded w-full"
          >
            <option value="">Choisir une catégorie</option>
            <option value="TARTE">Tarte</option>
            <option value="VIENNOISERIE">Viennoiserie</option>
            <option value="GROS-MODÈLES">Gros-modèles</option>
            <option value="ENTREMETS">Entremets</option>
          </select>
          <label>Catégorie</label>
        </div>

        {/* Image Upload */}
        <div className="input-container">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <label>Image</label>
        </div>

        {/* Preview */}
        {form.image01 && (
          <img src={form.image01} alt="Preview" className="w-24 h-24 object-cover rounded mb-3" />
        )}

        {/* Description */}
        <div className="input-container">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description"
          />
          <label>Description</label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "20px",
            padding: "10px 24px",
          }}
          className="text-white hover:opacity-90 transition-all"
        >
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      {/* Product List (no filter) */}
      {products.length === 0 ? (
        <p className="text-gray-500">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-4 text-center transition transform hover:scale-105 duration-200"
            >
              <img
                src={product.image01}
                alt={product.title}
                className="w-32 h-32 mx-auto object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">{product.price} DA</p>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <div className="flex justify-center gap-3 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    backgroundColor: "#facc15",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 16px",
                  }}
                  className="text-white hover:brightness-110 transition-all"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    backgroundColor: "#ef4444",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 16px",
                  }}
                  className="text-white hover:brightness-110 transition-all"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
