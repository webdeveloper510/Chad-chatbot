import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "../../css/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && checked) {
      navigate("/chatbot");
    }
  };

  return (
    <div className="custom-background">
      <Container className="text-center content">
        <h1 className="title">MEDICAL AI BOT</h1>
        <p className="subtitle">Get your medical questions answered instantly</p>

        <Form onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Checkbox to Agree */}
          {/* <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I agree to continue"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </Form.Group> */}

          {/* Submit Button */}
          <Button
          variant="light"
          size="lg"
          className="custom-button"
          onClick={() => navigate("/chat")} 
        >
          Talk to Medical AI
        </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Home;
