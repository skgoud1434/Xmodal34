import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  let menuRef = useRef();
  let divRef = useRef();
  let formRef = useRef();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      isValid = false;
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();

    if (dobDate > currentDate) {
      console.log(dobDate, currentDate);
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      isValid = false;
    }

    if (isValid) {
      setIsOpen(false);
      alert("Form submitted successfully");
    }
  };

  const toggleModal = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);

    return () => document.removeEventListener("click", handleCloseModal);
  }, []);

  const handleCloseModal = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      divRef.current &&
      !divRef.current.contains(e.target) &&
      formRef.current &&
      !formRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={toggleModal} ref={menuRef}>
        Open Form
      </button>
      <div>
        {isOpen && (
          <div className="modal-overlay" ref={divRef}>
            <div className="modal">
              <h3>Fill Details</h3>
              <div className="modal-content">
                <form action="" onSubmit={handleSubmit} ref={formRef}>
                  <label htmlFor="username">
                    <h5>Username:</h5>
                  </label>
                  <input
                    type="text"
                    id="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="email">
                    <h5>Email Address:</h5>
                  </label>

                  <input
                    type="email"
                    id="email"
                    required={true}
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="phone">
                    <h5>Phone Number:</h5>
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    required={true}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="dob">
                    <h5>Date of Birth:</h5>
                  </label>

                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    required={true}
                    onChange={handleInputChange}
                  />

                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
