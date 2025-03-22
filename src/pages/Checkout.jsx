import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "reactstrap";
import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  
  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);
  
  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
    };
    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
    
    // Show notification after form submission
    setShowNotification(true);
    
    // Optional: Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };
  
  return (
    <section>
      <Container>
        {showNotification && (
          <Row className="mb-4">
            <Col>
              <Alert color="success">
                Commande effectuée! Merci pour votre achat.
              </Alert>
            </Col>
          </Row>
        )}
        
        <Row>
          <Col lg="8" md="6">
            <h6 className="mb-4">Shipping Address</h6>
            <form className="checkout__form" onSubmit={submitHandler}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setEnterName(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEnterEmail(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="number"
                  placeholder="Phone number"
                  required
                  onChange={(e) => setEnterNumber(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Country"
                  required
                  onChange={(e) => setEnterCountry(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="City"
                  required
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
                Subtotal: <span>{cartTotalAmount}DA</span>
              </h6>
              <h6 className="d-flex align-items-center justify-content-between mb-3">
                Shipping: <span>{shippingCost}DA</span>
              </h6>
              <div className="checkout__total">
                <h5 className="d-flex align-items-center justify-content-between">
                  Total: <span>{totalAmount}DA</span>
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