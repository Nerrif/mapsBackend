const { generateTask } = require("../crypto");
const HttpError = require("../helpers/HTTPError");

const tasks = {};

const addTaskById = (id) => {
  const task = generateTask();
  tasks[id] = task;
  return task;
};
const findTaskById = (id) => {
  const task = tasks[id];
  if (!task) {
    throw HttpError(
      404,
      "This task was not found, please reload the page and try again"
    );
  }
  return task;
};

const removeTaskById = (id) => {
  delete tasks[id];
};

module.exports = { tasks, addTaskById, removeTaskById, findTaskById };
