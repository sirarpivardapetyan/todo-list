import { useState, useEffect } from "react";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";

function TaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add new task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success">Save</Button>
        <Button variant="warning">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;
