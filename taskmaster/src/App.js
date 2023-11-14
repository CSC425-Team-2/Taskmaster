import React, { useState } from 'react';

//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";

import TaskList from './TaskList';
import Task from './Task';
import TaskEditForm from './TaskEditForm';
import TaskAddForm from './TaskAddForm';
import './App.css';
import taskMasterLogo from './images/taskmaster-logo.jpg'

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
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    // Delete the task and clear the selection
    setTasks(tasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  /* 
  Couldn't get styles to apply correctly to the sort selection so removing for the time being.
  <select className='form-select nav-item'>
    <option>Order of Creation</option>
    <option>Due Dates</option>
    <option>Completed</option>
  </select>
  */

  return (

    <div className='root-style primary'>
      <nav className='navbar navbar-expand'>
        <div className='container-fluid no-padding'>
          <div className='navbar-brand page-header no-margin'>
            <img src={taskMasterLogo} alt='Taskmaster Logo' className='img-fluid' width='100px' height='auto'/>
            Taskmaster
          </div>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <button className='btn btn-primary secondary border-0 button-work-around' data-bs-toggle='modal' data-bs-target='#add-modal'>Add Task</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className='container-fluid'>

        <div className='p-1 secondary'></div>

        <div className = 'container'>
          <div className='row align-items-start no-margin no-padding'>
            <div className='col text-center'><p>Task Name</p></div>
            <div className='col text-center d-none d-md-block'><p>Due Date</p></div>
            <div className='col text-center d-none d-md-block'><p>Description</p></div>
            <div className='col text-center'><p>Status</p></div>
          </div>
        </div>

        <div className='p-1 secondary'></div>
        
        <div className='container primary no-padding'>
          <TaskList tasks={tasks} onTaskClick={handleTaskClick}/>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='add-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down modal-lg'>
            <div className='modal-content primary'>
              <div className='modal-header'>
                <h4>Add a New Task</h4>
              </div>
              <div className='modal-body'>
                <TaskAddForm onSave={handleAddTask}/>
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='edit-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down'>
            <div className='modal-content primary'>
              <div className='modal-body'>
                {editingTask && <TaskEditForm task={editingTask} onSave={handleSaveEditedTask}/>}
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='task-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down'>
            <div className='modal-content primary'>
              <div className='modal-body'>
                {selectedTask && <Task task={selectedTask} onComplete={handleCompleteTask} onEdit={handleEditTask} onDelete={handleDeleteTask}/>}
              </div>
            </div>
          </div>  
        </div>

        
        
      </div><div className='primary'></div>
    </div>
  );
};

export default App;
