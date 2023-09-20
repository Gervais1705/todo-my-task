import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-page">
      <Container>
        <div className="text-center p-5 banner">
          <h1 className="fw-bolder">Make Your Life More Organized</h1>
          <p>
            To make your daily life more organized and routinized, We have come
            with a great tool. It will help you to maintain your life more
            easily. Do your works on time.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
