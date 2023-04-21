import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Task from "../task/Task";
import styles from "./todo.module.css";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskAPI";
import TaskModal from "../taskModal/TaskModal";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  useEffect(() => {
    taskApi.getAll().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const handleInputChange = (event) => {
    // setNewTaskTitle(event.target.value);
  };

  const onAddNewTaskDatas = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added successfully");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message)
      });
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      onAddNewTaskDatas();
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
    toast.info("The task has been deleted successfully")
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
    toast.info(`The ${selectedTasks.size} task/tasks has/have been deleted successfully`)
  };
  let newTaskTitle = "";
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8">
          <Button
            variant="btn btn-outline-success"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Add new task
          </Button>
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
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => {
            setIsAddTaskModalOpen(false);
          }}
          onSave={onAddNewTaskDatas}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export default Todo;
