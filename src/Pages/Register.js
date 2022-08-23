import "../App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SignUp from "../SignUp";
import Login from "../Login";
function Register() {
  return (
    <div className="App">
      <header style={{ textAlign: "center" }}>
        <h1>FUZE INDIA</h1>
      </header>

      <Container>
        <Row>
          <Col>
            <h2>Sign Up</h2>
            <SignUp />
          </Col>
          <Col>
            <h2>Log In</h2>
            <Login />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
