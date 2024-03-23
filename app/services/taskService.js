const Task = require ("../models/taskModel");



//  add new task service
 // Extract image from the task data
 const addTask = async (taskData) => {
    try {

      
      taskData.status = "pending";
      const newTask = new Task(taskData);
      await newTask.save();
      return newTask;
    } catch (error) {
      throw new Error("Error adding new task");
    }
};


// edit task
const editTask = async (task_id) => {
    try {
        return await Task.findByIdAndUpdate(task_id, taskData, {new: true});
    } catch (error) {
        throw new Error (`Error editing task ${task_id}`)
    }
};

// get single task
const getSingleTask = async (task_id) => {
    try {
        return await Task.findById(task_id, taskData);
    } catch (error) {
        throw new Error (`Error fetching task with this ID ${task_id}`)
    }
};

// fetch users tasks
const fetchUsersTask = async (user_id) => {
    try {
        return await Task.find({user_id: user_id});
    } catch (error) {
        throw new Error ("Error fetching tasks ${user_id}")
    }
};

// fetch All tasks
const fetchAllTask = async () => {
    try {
        return await Task.find({status: 'pending'});
    } catch (error) {
        throw new Error ("Error fetching tasks ")
    }
};

// delete task
const deleteTask = async (task_id) => {
    try {
        return await Task.findByIdAndDelete(task_id);
    } catch (error) {
        throw new Error ("Error deleting task ${task_id}")
    }
};

module.exports = { addTask, editTask, fetchUsersTask, deleteTask, fetchAllTask, getSingleTask};