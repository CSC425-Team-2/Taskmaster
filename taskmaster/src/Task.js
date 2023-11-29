// Task.js

   import React from 'react';
   import './App.css';

   const Task = ({ task, onComplete, onEdit, onDelete}) => (

     <div>

       <h3>{task.title}</h3>


       <p>Due Date: {task.dueDate}</p>

       <p className='d-md-block description'>{task.description}</p>

       <p>Task Status: {task.completed ? 'Completed' : 'Pending'}</p>
      
      <div className='secondary-btn'>
        <button className='btn btn-primary secondary border-0 m-1' onClick={() => onComplete(task)}>{task.completed ? 'Set Pending' : 'Set Complete'}</button>

        <button className='btn btn-primary secondary border-0 m-1' data-bs-toggle='modal' data-bs-target='#edit-modal' onClick={() => onEdit(task)}>Edit Task</button>

        <button className='btn btn-primary secondary border-0 m-1' data-bs-dismiss='modal' onClick={() => onDelete(task.id)}>Delete</button>

        <button className='btn btn-primary secondary border-0 m-1' data-bs-dismiss='modal'>Close</button>
      </div>

     </div>

   );

 

   export default Task;

 