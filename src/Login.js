import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const initialState = {
    email: "",
    password: "",
  };
  const [userDetails, setUserDetails] = useState(initialState);
  const { email, password } = userDetails;
  const onInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    e.preventDefault();

    console.log("run login");
    setLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, userDetails)
      .then((res) => {
        setLoading(false);

        if (res.data.message === "Login successfull") {
          localStorage.setItem("token", res.data.token);
          setMessage("Login Successfull");
          handleShow();
          setUserDetails(initialState);

          navigate("/my_profile");
        } else if (res.data.message === "Email Does Not Exist") {
          setMessage("Email Does Not Exist ! Please sign up");
          handleShow();
          setUserDetails(initialState);
        } else if (res.data.message === "Invalid  Password") {
          setMessage("OOPS ! Invalid  Password");
          handleShow();
          setUserDetails(initialState);
        } else {
          setMessage("Something went wrong! please try again later");
          handleShow();
          setUserDetails(initialState);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setMessage("Something went wrong! please try again later");
        handleShow();
        setUserDetails(initialState);
      });
  };

  return (
    <Form noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="validationCustom03">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={onInputChange}
          name="email"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationCustom03">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onInputChange}
          name="password"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      {loading ? (
        <Button variant="primary" type="submit" disabled>
          {" "}
          Loging in...
        </Button>
      ) : (
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body> {message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}
