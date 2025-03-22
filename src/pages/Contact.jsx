import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { name, email, message });
    
    // Show notification
    setShowNotification(true);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
    
    // Optionally, reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      {/* Notification Message */}
      {showNotification && (
        <div className="notification-message">
          Message envoyé!.
        </div>
      )}
      
      {/* Right Section (Contact Form) */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <p>
          Hi, need help? Use the form below or email us at{" "}
          <a href="mailto:lucascastello69500@gmail.com">lucascastello69500@gmail.com</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-container">
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <textarea 
              id="message" 
              rows="4" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Left Section (Map) */}
      <div className="contact-map">
        <iframe
          title="Luca Castello Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.092994841688!2d2.9722279!3d36.7614033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb1c69005daab%3A0xe619624152708390!2sLa%20Patisserie%20Par%20Lucas%20Castello!5e0!3m2!1sen!2s!4v1690138931247!5m2!1sen!2s"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div className="map-overlay">Dely Brahim, Algeria</div>
      </div>
    </div>
  );
};

export default Contact;