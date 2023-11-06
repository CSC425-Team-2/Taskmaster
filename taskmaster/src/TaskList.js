// TaskList.js

   import React from 'react';

 

   const TaskList = ({ tasks, onTaskClick }) => (

     <ul>

       {tasks.map((task) => (

         <li key={task.id} onClick={() => onTaskClick(task.id)}>

           {task.title} - {task.dueDate}
		   <br />
		   &nbsp;&nbsp;&nbsp;&nbsp;{task.completed ? 'Completed' : 'Pending'}

         </li>

       ))}

     </ul>

   );



   export default TaskList;