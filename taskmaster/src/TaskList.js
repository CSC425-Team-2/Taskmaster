// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (
    
     <ul>
      <div>
       {tasks.map((task) => (
          <div key={task.id} className='row' data-bs-toggle='modal' data-bs-target='#task-modal' onClick={() => onTaskClick(task.id)} > 
            <div className='col-3'>{task.title}</div>
            <div className='col-3'>{task.dueDate}</div>
            <div className='col-3'>{task.description}</div>
            <div className='col-3'>{task.completed ? 'Completed' : 'Pending'}</div>
          </div>
       ))}
       </div>
     </ul>
     
    
   );

   export default TaskList;