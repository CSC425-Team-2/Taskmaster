// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (
    
     <ul>
      <div>
       {tasks.map((task) => (
          <div key={task.id} class='row' onClick={() => onTaskClick(task.id)} > 
            <div class='col-3'>{task.title}</div>
            <div class='col-3'>{task.dueDate}</div>
            <div class='col-3'>{task.description}</div>
            <div class='col-3'>{task.completed ? 'Completed' : 'Pending'}</div>
          </div>
       ))}
       </div>
     </ul>
     
    
   );

   export default TaskList;