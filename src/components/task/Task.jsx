import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
import { formatDate } from "../../tools/dateFormat";

function Task(props) {
  const taskData = props.data;
  return (
    <Col>
      <Card
        bg="light"
        border="info"
        className="mt-5"
        style={{ maxWidth: "18rem" }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Check
              checked={props.checked}
              className={styles.taskCheckbox}
              onChange={() => {
                props.onSelectCheckbox(taskData._id);
              }}
            />
            <Card.Text className="text-info">
              Status: {taskData.status}
            </Card.Text>
          </div>

          <Card.Title className={styles.textShorter}>
            {taskData.title}
          </Card.Title>
          <Card.Text className={styles.textShorter}>
            {taskData.description}
          </Card.Text>
          <div className="d-flex gap-5  ">
            {" "}
            <Card.Text className="text-success">
              Created_at: <br />
              {formatDate(taskData.created_at)}
            </Card.Text>
            <Card.Text className="text-danger">
              Deadline: <br />
              {formatDate(taskData.date)}
            </Card.Text>
          </div>
          <div className={styles.taskButtons}>
            <Button
              className={styles.editButton}
              variant="warning"
              onClick={() => {
                props.onTaskEdit(taskData);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              onClick={() => {
                props.onDeleteButton(taskData._id);
              }}
              variant="danger"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
Task.propTypes = {
  data: PropTypes.object.isRequired,
  onDeleteButton: PropTypes.func.isRequired,
  onSelectCheckbox: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
};

export default memo(Task);
