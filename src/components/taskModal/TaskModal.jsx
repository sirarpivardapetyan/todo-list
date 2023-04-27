import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, Modal } from "react-bootstrap";
import styles from "./taskModal.module.css";
import { formatDate } from "../../tools/dateFormat";

function TaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const { data } = props;
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date ? new Date(data.date) : new Date());
    }
  }, [props]);

  const saveTaskDatas = () => {
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      date: formatDate(date),
    };
    if (props.data) {
      newTask._id = props.data._id;
    }
    props.onSave(newTask);
  };

  const onChangeTitle = (event) => {
    const { value } = event.target;
    const trimmedTitle = value.trim();
    setIsTitleValid(!!trimmedTitle);
    setTitle(trimmedTitle);
  };
  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className={`${!isTitleValid ? styles.invalid : ""} mb-2`}
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
        />
        <Form.Control
          className="mb-3"
          placeholder="Description"
          as="textarea"
          aria-label="With textarea"
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="d-flex justify-content-center align-items-center text-danger gap-2">
          <h6>Deadline:</h6>
          <DatePicker showIcon selected={date} onChange={setDate} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={saveTaskDatas}
          disabled={!isTitleValid}
        >
          Save
        </Button>
        <Button variant="warning" onClick={props.onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
TaskModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default TaskModal;
