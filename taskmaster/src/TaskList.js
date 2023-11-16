// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (
    
    <ul className='no-margin  no-padding'>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className='row align-items-start p-2 block mx-auto' data-bs-toggle='modal' data-bs-target='#task-modal' onClick={() => onTaskClick(task.id)}>
            <div className='col text-center'>{task.title}</div>
            <div className='col text-center d-none d-md-block'>{task.dueDate}</div>
            <div className='col-3 text-center d-none d-md-block description'>{task.description}</div>
            <div className='col text-center'>{task.completed ? 'Completed' : 'Pending'}</div>
            <div style={{ borderTop: "2px solid #FF5430"}}></div>
          </div>
       ))}
      </div>
    </ul>
     
    
   );



   export default TaskList;