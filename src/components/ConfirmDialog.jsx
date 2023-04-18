import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to delete{" "}
          {props.tasksCount !== 0 ? props.tasksCount : null}{" "}
          {props.tasksCount > 1 ? "tasks" : "task"}?
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

ConfirmDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmDialog;
