const { verifySolution } = require("../crypto");
const HttpError = require("../helpers/HTTPError");
const { findTaskById } = require("../taskDb");

const checkTaskSolution = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(HttpError(400, "The task ID is not valid"));
    return;
  }
  try {
    const { solution } = req.body;
    if (!solution) {
      next(HttpError(400, "There is no solution"));
      return;
    }
    const { nonce, difficulty } = findTaskById(id);

    const isValidSolution = verifySolution(nonce, solution, difficulty);

    if (!isValidSolution) {
      next(HttpError(400, "Solution reject"));
      return;
    }
    // removeTaskById(id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkTaskSolution;
