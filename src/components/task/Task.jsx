import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faCheck, faHistory } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
import { formatDate } from "../../tools/formatDate";

function Task(props) {
  const taskData = props.data;
  return (
    <Col xs={9} sm={6} md={6} lg={4}>
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
          <Card.Title className={`${styles.textShorter} pb-5`}>
            {taskData.title}
          </Card.Title>
          <Card.Text className={styles.textShorter} >
            {taskData.description}
          </Card.Text>
          <div className="d-flex gap-5">
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
            {
              taskData.status === "active" ?
                <Button
                  className={styles.statusButton}
                  title="Mark as done"
                  variant="success"
                  onClick={() => props.onStatusChange({ status: "done", _id: taskData._id })}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button> :
                <Button
                  className={styles.statusButton}
                  title="Mark as active"
                  variant="info"
                  onClick={() => props.onStatusChange({ status: "active", _id: taskData._id })}>
                  <FontAwesomeIcon icon={faHistory} />
                </Button>
            }
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
  onStatusChange: PropTypes.func.isRequired,

};

export default memo(Task);
