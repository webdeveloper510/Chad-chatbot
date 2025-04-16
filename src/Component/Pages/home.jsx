import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "../../css/home.css";
import { userLogin } from "../../utils/api";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      userLogin({
        email: email,
      })
        .then((res) => {
          if (res?.data?.status == 200 || res?.data?.status == 201) {
            toast.success(res?.data?.message, {theme: "colored",})
            setEmailError("");
            navigate("/loanapp/newchatbot");
            localStorage.setItem("bot_user_access_token", email);
          }else{
            toast.error(res?.data?.message, {theme: "colored",})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="custom-background">
      <Container className="text-center content">
        <h1 className="title">LOAN SUGGEST AI BOT</h1>
        <p className="subtitle">
          Get your medical questions answered instantly
        </p>

        <Form>
          {/* Email Input Field */}
          <Form.Group className="mb-1">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleInputChange(e)}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                }
              }}
            />
          </Form.Group>
          {emailError && (
            <p
              style={{
                color: "red",
                margin: "2px 0 0 10px",
                textAlign: "left",
              }}
            >
              {emailError}
            </p>
          )}

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
          <div className="loan_bot_butn">
            <Button
              variant="light"
              size="lg"
              className="custom-button"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Talk to Loan Bot AI
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Home;
