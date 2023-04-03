import { Modal, Button } from "react-bootstrap";

function ConfirmDialog() {
  return (
    <Modal size="sm" 
    show={false} 
    onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to delete the selected tasks?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center gap-4">
        <Button variant="danger">Delete</Button>
        <Button variant="success">Cancel</Button>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;
