// TaskList.js

   import React from 'react';
   import './App.css';

 

   const TaskList = ({ tasks, onTaskClick }) => (

     <ul>

       {tasks.map((task) => (

         <li key={task.id} onClick={() => onTaskClick(task.id)}>

           {task.title} - {task.dueDate}
		   <br />
		   {task.completed ? 'Completed' : 'Pending'}

         </li>

       ))}

     </ul>

   );

 

   export default TaskList;