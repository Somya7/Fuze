import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function MyProfile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const getProfileDetails = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.name);
          setUserDetails(res.data.data);
        });
    };
    getProfileDetails();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <Row>
        <Col></Col>
        <Col md="auto">
          <h1>Fuze India</h1>
        </Col>
        <Col>
          <Button onClick={handleLogout}>Log out</Button>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col></Col>
          <Col md="auto">
            <Card
              body
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                width: "400px",
                textAlign: "center",
              }}
            >
              <h3>
                {" "}
                Welcome back{" "}
                <span style={{ color: "#f9c62f" }}> {userDetails?.name}</span>
              </h3>
              <h4>Personal Details</h4>
              <h4>
                <span style={{ color: "#807ae1" }}>Name:</span>{" "}
                {userDetails?.name}
              </h4>
              <h4>
                <span style={{ color: "#807ae1" }}>Email: </span>
                {userDetails?.email}
              </h4>{" "}
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
