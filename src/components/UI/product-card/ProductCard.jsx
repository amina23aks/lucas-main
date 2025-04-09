import React, { useState } from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { favoritesActions } from "../../../store/favoritesSlice";

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();

  const [notification, setNotification] = useState("");

  const toggleFavorite = () => {
    dispatch(favoritesActions.addFavorite(props.item));
    setNotification("✅ Produit ajouté aux favoris !");
    setTimeout(() => setNotification(""), 3000);
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
      })
    );
  };

  return (
    <div className="product__item">
      {/* ✅ Notification */}
      {notification && (
        <div className="notification-banner">
          {notification}
        </div>
      )}

      <div className="product__img">
        <img src={image01} alt="product-img" />
      </div>

      <div className="product__content">
        <h5 className="product__title">
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>

        <div className="product__details">
          <span className="product__price">{price}DA</span>

          <button className="favorite-btn" onClick={toggleFavorite}>
            <i className="ri-heart-add-line"></i>
          </button>

          <button className="addTOCart__btn" onClick={addToCart}>
            <i className="ri-shopping-cart-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
