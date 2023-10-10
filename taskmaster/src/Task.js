// Task.js

   import React from 'react';

   const Task = ({ task, onComplete, onEdit, onDelete, onClose}) => (

     <div>

       <h3>{task.title}</h3>

       <p>{task.description}</p>

       <p>Due Date: {task.dueDate}</p>

       <p>Task Status: {task.completed ? 'Completed' : 'Pending'}</p>

       <button onClick={() => onComplete(task)}>{task.completed ? 'Incomplete' : 'Complete'}</button>

       <button onClick={() => onEdit(task)}>Edit</button>

       <button onClick={() => onDelete(task.id)}>Delete</button>

       <button onClick={() => onClose(task)}>Close</button>

     </div>

   );

 

   export default Task;

 