import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
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
          <Form.Check
            className={styles.taskCheckbox}
            onClick={() => {
              props.onSelectCheckbox(taskData.id);
            }}
          />
          <Card.Title>{taskData.title}</Card.Title>
          <Card.Text>Description</Card.Text>
          <div className={styles.taskButtons}>
            <Button className={styles.editButton} variant="warning">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              onClick={() => {
                props.onDeleteButton(taskData.id);
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

export default Task;
