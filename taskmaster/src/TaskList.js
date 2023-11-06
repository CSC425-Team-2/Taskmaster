// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (
    <div className='bottom-container'> 
     <ul>

       {tasks.map((task) => (
        
        <li key={task.id} onClick={() => onTaskClick(task.id)}>
          <div id='col1'>{task.title}</div>
          <div id='col2'>{task.dueDate}</div>
          <div id='col3'>{task.description}</div>
          <div id='col4'>{task.completed ? 'Completed' : 'Pending'}</div>
          <br/>
        </li>
       
       ))}

     </ul>
     </div>
   );

 

   export default TaskList;