// Task.js

   import React from 'react';
   import './App.css';

   const Task = ({ task, onComplete, onEdit, onDelete, onClose}) => (

     <div className="custom-popup">

       <h3>{task.title}</h3>

       <p>{task.description}</p>

       <p>Due Date: {task.dueDate}</p>

       <p>Task Status: {task.completed ? 'Completed' : 'Pending'}</p>

       <button onClick={() => onComplete(task)}>{task.completed ? 'Incomplete' : 'Complete'}</button>

       <button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#edit-modal' onClick={() => onEdit(task)}>Edit Task</button>

       <button onClick={() => onDelete(task.id)}>Delete</button>

       <button class='btn btn-primary' data-bs-dismiss='modal'>Cancel</button>

     </div>

   );

 

   export default Task;

 