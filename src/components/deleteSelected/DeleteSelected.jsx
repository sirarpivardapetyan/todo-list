import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./deleteSelected.module.css";
import ConfirmDialog from "../ConfirmDialog";

function DeleteSelected(props) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  };
  return (
    <>
      <Row>
        <Col>
          <Button
            variant="btn btn-outline-danger"
            className="btn-sm mr-8 mt-5 d-flex justify-content-center align-items-center float-end"
            disabled={props.disabled}
            onClick={toggleConfirmDialog}
          >
            <FontAwesomeIcon
              className={styles.deleteSelectedIcon}
              icon={faTrash}
            />
            <span>All selected</span>
          </Button>
        </Col>
      </Row>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          onCancel={toggleConfirmDialog}
          onSubmit={() => {
            props.onSubmit();
            toggleConfirmDialog();
          }}
          tasksCount={props.tasksCount}
        />
      )}
    </>
  );
}

export default DeleteSelected;
