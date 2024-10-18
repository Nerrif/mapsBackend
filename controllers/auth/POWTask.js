const ctrlWrapper = require("../../helpers/ctrlWrapper")
const { addTaskById } = require("../../taskDb/taskList")


const POWTask = async (req, res) => {
    const { id } = req.params
    const task = addTaskById(id)
    res.json(task)
}
module.exports = {POWTask:ctrlWrapper(POWTask)}