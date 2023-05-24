import { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/reducers/loader";
import FormApi from "../../api/formApi";
import styles from "./contact.module.css";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

const Contact = () => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [messageErrorMessage, setMessageErrorMessage] = useState(null);
  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;
    if (!name) {
      setNameErrorMessage("Name is required!");
    } else {
      setNameErrorMessage(null);
    }
    if (!message) {
      setMessageErrorMessage("Message is required!");
    } else {
      setMessageErrorMessage(null);
    }
    if (!email) {
      setEmailErrorMessage("Email address is required!");
      return;
    }
    setEmailErrorMessage(null);

    if (!emailRegex.test(email)) {
      setEmailErrorMessage("Email address is not valid!");
      return;
    }
    setEmailErrorMessage(null);
    if (nameErrorMessage) {
      return;
    }
    const form = {
      name,
      email,
      message,
    };
    try {
      dispatch(setLoader(true));
      await formApi.sendForm(form);
      toast.success("Thank you for contacting us, the form has been sent!");
      nameRef.current.value = "";
      messageRef.current.value = "";
      emailRef.current.value = "";
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoader(false));
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={10} sm={8} md={6} lg={4} className="border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full name*
            </label>
            <input
              ref={nameRef}
              type="text"
              className={`${styles.textInput} ${
                nameErrorMessage ? styles.invalid : ""
              } form-control mb-3`}
              id="name"
              placeholder="name"
            />
            <label htmlFor="email" className="form-label">
              Email address*
            </label>
            <input
              ref={emailRef}
              type="email"
              className={`${styles.textInput} ${
                emailErrorMessage ? styles.invalid : ""
              } form-control`}
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label">
              Message*
            </label>
            <textarea
              ref={messageRef}
              className={`${styles.textInput} ${
                messageErrorMessage ? styles.invalid : ""
              } form-control`}
              id="textarea"
              rows="3"
            ></textarea>
          </div>
          <Button
            variant="success"
            className={styles.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {nameErrorMessage && (
            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
              {nameErrorMessage}
            </h5>
          )}
          {emailErrorMessage && (
            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
              {emailErrorMessage}
            </h5>
          )}
          {messageErrorMessage && (
            <h5 className={`${styles.errorMessage} mt-2 p-1`}>
              {messageErrorMessage}
            </h5>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
