import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-2">
                    Copyright &copy; eShop</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
