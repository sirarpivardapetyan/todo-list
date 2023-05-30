function About() {
  return (
    <div className="d-flex flex-column align-items-center p-4">
      <h1 className="text-info">About </h1>
      <p>
        This is a todo list application built with React. It allows you to
        create, manage, and track your tasks efficiently.
      </p>
      <p>Features:</p>
      <ul>
        <li>Create new tasks</li>
        <li>Mark tasks as completed</li>
        <li>Delete tasks</li>
        <li>Filter tasks</li>
      </ul>
    </div>
  );
}

export default About;
