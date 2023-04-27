const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

class TaskApi {
  #request(method, data = {}) {
    const { body, params, filters } = data;
    const req = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      req.body = JSON.stringify(body);
    }
    let url = taskApiUrl;
    if (params) {
      url = `${url}/${params}`;
    }
    if (filters) {
      let query = '?';
      Object.entries(filters)
        .forEach(([key, value]) => {
          if (!value) {
            return;
          }
          query += `${key}=${value}&`;
        });
      url += query;
    }
    return fetch(url, req)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        return data;
      });
  }
  getAll(filters) {
    return this.#request("GET", { filters: filters });
  }
  add(task) {
    return this.#request("POST", { body: task });
  }
  delete(taskId) {
    return this.#request("DELETE", { params: taskId });
  }
  deleteMany(taskIds) {
    return this.#request("PATCH", { body: { tasks: taskIds } });
  }
  update(editedTask) {
    return this.#request("PUT", { body: editedTask, params: editedTask._id });
  }
}

export default TaskApi;
