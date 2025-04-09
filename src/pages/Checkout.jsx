import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "reactstrap";
import { useAuth } from "../components/AuthContext/AuthContext.jsx"; // ✅ import auth context
import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { user } = useAuth(); // ✅ get current user

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setEmailError("❌ Vous devez être connecté pour commander.");
      return;
    }

    if (enterEmail !== user.email) {
      setEmailError("❌ L'email ne correspond pas à votre compte.");
      return;
    }

    setEmailError("");

    const order = {
      id: Date.now(),
      shipping_address: {
        name: enterName,
        email: enterEmail,
        phone: enterNumber,
        city: enterCity,
      },
      items: cartItems,
      total_amount: totalAmount,
      created_at: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setShowNotification(true);
    setEnterName("");
    setEnterEmail("");
    setEnterNumber("");
    setEnterCity("");
  };

  return (
    <section>
      <Container>
        {showNotification && (
          <Row className="mb-4">
            <Col>
              <Alert color="success">✅ Commande effectuée !</Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col lg="8" md="6">
            <h6 className="mb-4">Adresse de livraison</h6>

            <form className="checkout__form" onSubmit={submitHandler}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={enterName}
                  onChange={(e) => setEnterName(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={enterEmail}
                  onChange={(e) => setEnterEmail(e.target.value)}
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="form__group">
                <input
                  type="number"
                  placeholder="Phone number"
                  required
                  value={enterNumber}
                  onChange={(e) => setEnterNumber(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={enterCity}
                  onChange={(e) => setEnterCity(e.target.value)}
                />
              </div>

              <button type="submit" className="addTOCart__btnC">
                Payment
              </button>
            </form>
          </Col>

          <Col lg="4" md="6">
            <div className="checkout__bill">
              <h6 className="d-flex align-items-center justify-content-between mb-3">
                Subtotal: <span>{cartTotalAmount} DA</span>
              </h6>
              <h6 className="d-flex align-items-center justify-content-between mb-3">
                Shipping: <span>{shippingCost} DA</span>
              </h6>
              <div className="checkout__total">
                <h5 className="d-flex align-items-center justify-content-between">
                  Total: <span>{totalAmount} DA</span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
