import React, { useState} from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function SignUp() {
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
    name: "",
    email: "",
    password: "",
  };
  const [userDetails, setUserDetails] = useState(initialState);
  const { name, email, password } = userDetails;
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

    console.log("run");
    setLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/users`, userDetails)
      .then((res) => {
        if (res.data.message === "Sign Up Successfull") {
          setMessage("Sign Up Successfull");
          handleShow();
          setUserDetails(initialState);
        } else if (res.data.message === "User Already Exist") {
          setMessage("User Already Exist");
          handleShow();
          setUserDetails(initialState);
        } else {
          setMessage("Something went wrong! please try again later");
          handleShow();
          setUserDetails(initialState);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Something went wrong! please try again later");
        handleShow();
        setUserDetails(initialState);
      });
  };

  return (
    <Form noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="validationCustom03">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={onInputChange}
          name="name"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      </Form.Group>
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
        <Button variant="primary" type="submit" disabled onClick={handleSubmit}>
          {" "}
          Signing up...
        </Button>
      ) : (
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign up
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
