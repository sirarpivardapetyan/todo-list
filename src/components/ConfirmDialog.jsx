import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to delete {props.tasksCount > 1 ? "taks" : "task"} ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center gap-4">
        <Button onClick={props.onSubmit} variant="danger">
          Delete
        </Button>
        <Button onClick={props.onCancel} variant="success">
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;
