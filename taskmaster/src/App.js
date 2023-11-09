import React, { useState } from 'react';

//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";

import TaskList from './TaskList';
import Task from './Task';
import TaskEditForm from './TaskEditForm';
import TaskAddForm from './TaskAddForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (newTask) => {
    // Create a new task with a unique ID and mark it as not completed
    const task = { ...newTask, id: tasks.length + 1, completed: false };
    setTasks([...tasks, task]);
  };

  const handleTaskClick = (taskId) => {
    // Find and select the clicked task
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task);
    
  };

  const handleCompleteTask = (task) => {
    // Set the task complete or incomplete
    task.completed = !task.completed;
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleEditTask = (editedTask) => {
    // Update the selected task with the edited task
    setEditingTask(editedTask);
  };

  const handleSaveEditedTask = (editedTask) => {
    // Update the task in the 'tasks' state
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);

    // Update the selected task with the edited task
    setSelectedTask(editedTask);
  };

  const handleDeleteTask = (taskId) => {
    // Delete the task and clear the selection
    setTasks(tasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  return (

    <div>
      <nav class='navbar navbar-expand-md navbar-dark bg-light'>
        <div class='container-fluid'>

          <h2>TaskMaster</h2>

          <button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#add-modal'>Add Task</button>
        
          <select class='form-select'>
            <option>Order of Creation</option>
            <option>Due Dates</option>
            <option>Completed</option>
          </select>
        </div>
      </nav>

      <div class='container-fluid'>


        <hr class='divider-line' />

        <div class = 'container'>
          <div class='row'>
            <div class='col-3'><p>Task Name</p></div>
            <div class='col-3'><p>Due Date</p></div>
            <div class='col-3'><p>Description</p></div>
            <div class='col-3'><p>Status</p></div>
          </div>
        </div>

        <hr className='divider-line' />
        
        <div class='container'>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
        </div>

        <div class='modal' id='add-modal'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h4>PLACEHOLDERS Adding a New Task</h4>
              </div>
              <div class='modal-body'>
                <TaskAddForm onSave={handleAddTask}/>
              </div>
            </div>
          </div>
        </div>

        <div class='modal' id='edit-modal'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h4>PLACEHOLDERS Editing a Task</h4>
              </div>
              <div class='modal-body'>
                <TaskEditForm task={editingTask} onSave={handleSaveEditedTask}/>
              </div>
            </div>
          </div>
        </div>

        <div class='modal' id='task-modal'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h4>PLACEHOLDERS Task Opened</h4>
              </div>
              <div class='modal-body'>
                <Task task={selectedTask} onComplete={handleCompleteTask} onEdit={handleEditTask} onDelete={handleDeleteTask}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
