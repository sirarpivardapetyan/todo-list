const taskApiUrl = process.env.REACT_APP_API_URL;

class TaskApi {
  #request(method, body = null) {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body !== null) {
      params.body = JSON.stringify(body);
    }
    return fetch(taskApiUrl, params).then((response) => response.json());
  }
  getAll() {
    return this.#request("GET");
  }
  add(task) {
    return this.#request("POST", task);
  }
}

export default TaskApi;
