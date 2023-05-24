import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Button, Card, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/reducers/loader";
import TaskModal from "../../components/taskModal/TaskModal";
import { formatDate } from "../../tools/formatDate";
import TaskApi from "../../api/taskAPI";
import styles from "./singleTask.module.css";

const taskApi = new TaskApi();

function SingleTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoader(true));
    taskApi
      .getSingle(taskId)
      .then((task) => {
        setTask(task);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  }, [taskId, dispatch]);

  const onEditTask = (editedTask) => {
    dispatch(setLoader(true));
    taskApi
      .update(editedTask)
      .then((updatedTask) => {
        setTask(updatedTask);
        toast.success(`Task has been updated successfully!`);
        setEditTaskModalOpen(false);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  };

  const onDeleteButton = () => {
    dispatch(setLoader(true));
    taskApi
      .delete(taskId)
      .then(() => {
        navigate("/");
        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  };

  return (
    <div className={styles.taskContainer}>
      <Container>
        <Row className={`justify-content-center text-center ${styles.page}`}>
          <Col xs={12}>
            <Card className="mt-2 mb-2" bg="light" border="info">
              {task ? (
                <Card.Body>
                  <Card.Text
                    className={`${
                      task.status === "active" ? "text-info" : "text-success"
                    } text-start`}
                  >
                    Status: {task.status}
                  </Card.Text>
                  <Card.Title className="pb-5">{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <div className="d-flex gap-5">
                    {" "}
                    <Card.Text className="text-success">
                      Created_at: <br />
                      {formatDate(task.created_at)}
                    </Card.Text>
                    <Card.Text className="text-danger">
                      Deadline: <br />
                      {formatDate(task.date)}
                    </Card.Text>
                  </div>
                  <div className={styles.taskButtons}>
                    {task.status === "active" ? (
                      <Button
                        className={styles.statusButton}
                        title="Mark as done"
                        variant="success"
                        onClick={() =>
                          onEditTask({ status: "done", _id: task._id })
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    ) : (
                      <Button
                        className={styles.statusButton}
                        title="Mark as active"
                        variant="info"
                        onClick={() =>
                          onEditTask({ status: "active", _id: task._id })
                        }
                      >
                        <FontAwesomeIcon icon={faHistory} />
                      </Button>
                    )}
                    <Button
                      className={styles.editButton}
                      variant="warning"
                      onClick={() => setEditTaskModalOpen(true)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button onClick={onDeleteButton} variant="danger">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </Card.Body>
              ) : (
                <h3>Task data is not found</h3>
              )}
            </Card>
          </Col>

          {isEditTaskModalOpen && (
            <TaskModal
              onCancel={() => setEditTaskModalOpen(false)}
              onSave={onEditTask}
              data={task}
            />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default SingleTask;
