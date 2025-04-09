import React, { useState, useEffect } from "react";
import defaultProducts from "../assets/data/products.json";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { favoritesActions } from "../store/favoritesSlice";
import { useAuth } from "../components/AuthContext/AuthContext"; // ✅ Auth context
import "../styles/product-details.css";
import ProductCard from "../components/UI/product-card/ProductCard";

const FoodDetails = () => {
  const [product, setProduct] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [notLoggedInError, setNotLoggedInError] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useAuth(); // ✅ Auth info

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("products")) || [];
    const combined = [...defaultProducts, ...localData];
    const found = combined.find((p) => String(p.id) === String(id));
    setProduct(found);

    if (found) {
      setPreviewImg(found.image01);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Produit non trouvé ❌</h2>
        <p>Le produit demandé n'existe pas ou a été supprimé.</p>
      </Container>
    );
  }

  const { title, price, category, image01, image02, image03 } = product;
  const description = product.description || product.desc || "Pas de description.";

  const addToCart = () => {
    dispatch(cartActions.addItem({ id, title, price, image01 }));
  };

  const toggleFavorite = () => {
    dispatch(favoritesActions.addFavorite({ id, title, price, image01 }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setNotLoggedInError("❌ Veuillez vous connecter pour laisser un avis.");
      return;
    }

    if (enteredEmail !== user.email) {
      setEmailError("❌ Cet email ne correspond pas à votre compte.");
      return;
    }

    setEmailError("");
    setNotLoggedInError("");

    const comment = {
      id: Date.now(),
      productId: product.id,
      productName: product.title,
      name: enteredName,
      email: enteredEmail,
      message: reviewMsg,
      created_at: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("comments")) || [];
    localStorage.setItem("comments", JSON.stringify([...existing, comment]));

    // Clear form
    setEnteredName("");
    setEnteredEmail("");
    setReviewMsg("");
  };

  const relatedProduct = defaultProducts.filter(
    (item) => item.category === category && item.id !== id
  );

  return (
    <section>
      <Container>
        <Row>
          {/* Thumbnails */}
          <Col lg="2" md="2">
            <div className="product__images">
              {image01 && (
                <div className="img__item mb-3" onClick={() => setPreviewImg(image01)}>
                  <img src={image01} alt="" className="w-50" />
                </div>
              )}
              {image02 && (
                <div className="img__item mb-3" onClick={() => setPreviewImg(image02)}>
                  <img src={image02} alt="" className="w-50" />
                </div>
              )}
              {image03 && (
                <div className="img__item" onClick={() => setPreviewImg(image03)}>
                  <img src={image03} alt="" className="w-50" />
                </div>
              )}
            </div>
          </Col>

          {/* Main image */}
          <Col lg="4" md="4">
            <div className="product__main-img">
              <img src={previewImg} alt="" className="w-100" />
            </div>
          </Col>

          {/* Info */}
          <Col lg="6" md="6">
            <div className="single__product-content">
              <h2 className="product__title mb-3">{title}</h2>
              <p className="product__price">
                Prix: <span>{price} DA</span>
              </p>
              <p className="category mb-5">
                Catégorie: <span>{category}</span>
              </p>
              <div className="d-flex align-items-center gap-3">
                <button className="favorite-btnD" onClick={toggleFavorite}>
                  <i className="ri-heart-add-line"></i> Favori
                </button>
                <button className="addTOCart__btnD" onClick={addToCart}>
                  <i className="ri-shopping-cart-line"></i> Ajouter au panier
                </button>
              </div>
            </div>
          </Col>

          {/* Tabs */}
          <Col lg="12">
            <div className="tabs d-flex align-items-center gap-5 py-3">
              <h6 className={tab === "desc" ? "tab__active" : ""} onClick={() => setTab("desc")}>
                Description
              </h6>
              <h6 className={tab === "rev" ? "tab__active" : ""} onClick={() => setTab("rev")}>
                Avis
              </h6>
            </div>

            {tab === "desc" ? (
              <div className="tab__content">
                <p>{description}</p>
              </div>
            ) : (
              <div className="tab__form mb-3">
                <form className="form" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Nom"
                      value={enteredName}
                      onChange={(e) => setEnteredName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={enteredEmail}
                      onChange={(e) => setEnteredEmail(e.target.value)}
                      required
                    />
                    {emailError && (
                      <p className="error-message">{emailError}</p>
                    )}
                  </div>
                  <div className="form__group">
                    <textarea
                      rows={5}
                      placeholder="Votre avis"
                      value={reviewMsg}
                      onChange={(e) => setReviewMsg(e.target.value)}
                      required
                    />
                  </div>

                  {notLoggedInError && (
                    <p className="error-message">{notLoggedInError}</p>
                  )}

                  <button type="submit" className="submit">
                    Envoyer
                  </button>
                </form>
              </div>
            )}
          </Col>

          {/* Related */}
          <Col lg="12" className="mb-5 mt-4">
            <h2 className="related__Product-title">Vous aimerez aussi</h2>
          </Col>

          {relatedProduct.map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FoodDetails;
