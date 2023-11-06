// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (
    
     <ul>
      <div className='bottom-container'>
       {tasks.map((task) => (

          <div key={task.id} className='row' onClick={() => onTaskClick(task.id)}> 
            <div id='col1'>{task.title}</div>
            <div id='col2'>{task.dueDate}</div>
            <div id='col3'>{task.description}</div>
            <div id='col4'>{task.completed ? 'Completed' : 'Pending'}</div>
          </div>
       
       ))}
      </div>
     </ul>
    
   );

   export default TaskList;