import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import styles from "./todo.module.css";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskAPI";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    taskApi.getAll().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const addNewTaskDatas = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    const newTask = {
      title: trimmedTitle,
    };

    taskApi.add(newTask).then((task) => {
      const tasksCopy = [...tasks];
      tasksCopy.push(task);
      setTasks(tasksCopy);
      setNewTaskTitle("");
    });
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      addNewTaskDatas();
    }
  };

  const onDeleteButton = (taskId) => {
    const newTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(newTasks);
    if (selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      setSelectedTasks(newSelectedTasks);
    }
  };
  const onSelectCheckbox = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    selectedTasksCopy.has(taskId)
      ? selectedTasksCopy.delete(taskId)
      : selectedTasksCopy.add(taskId);
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = () => {
    const newTasks = [];

    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        newTasks.push(task);
      }
    });
    setTasks(newTasks);
    setSelectedTasks(new Set());
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8">
          <InputGroup>
            <Form.Control
              placeholder="Input task title"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={newTaskTitle}
            />
            <Button
              variant="btn btn-outline-success"
              onClick={addNewTaskDatas}
              disabled={!newTaskTitle.trim()}
            >
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onDeleteButton={setTaskToDelete}
              onSelectCheckbox={onSelectCheckbox}
            />
          );
        })}
      </Row>
      <DeleteSelected
        disabled={!selectedTasks.size}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />
      {taskToDelete && (
        <ConfirmDialog
          onCancel={() => {
            setTaskToDelete(null);
          }}
          onSubmit={() => {
            onDeleteButton(taskToDelete);
            setTaskToDelete(null);
          }}
          tasksCount={1}
        />
      )}
    </Container>
  );
}

export default Todo;
