import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Card } from "react-bootstrap";

class Todo extends Component {

state = {
  tasks: [],

}
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8">
            <InputGroup>
              <Form.Control placeholder="Input task title" />
              <Button variant="btn btn-outline-success">Add</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              bg="light"
              border="info"
              className="mt-5"
              style={{ maxWidth: "18rem" }} >
              <Card.Body>
                <Card.Title>Task title</Card.Title>
                <Card.Text>Description</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
