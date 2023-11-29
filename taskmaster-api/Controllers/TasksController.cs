using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using taskmaster_api.Data;

namespace taskmaster_api.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskmasterDbContext _context;
        
        public TasksController(TaskmasterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Task>> GetTasks()
        {
            var tasks = _context.Tasks
                .Select(task => new
                {
                    TaskID = task.TaskID,
                    Title = task.Title,
                    Description = task.Description,
                    DueDate = task.DueDate.ToString("MM-dd-yyyy"), // Format the date as needed
                    IsCompleted = task.IsCompleted
                })
                .ToList();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] Task task)
        {
            if (task == null)
            {
                return BadRequest("Task object is null");
            }

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{TaskID}")]
        public IActionResult DeleteTask(int TaskID) 
        {
            var taskToDelete = _context.Tasks.Find(TaskID);

            if(taskToDelete == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskToDelete);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("{TaskID}")]
        public IActionResult UpdateTaskComplete(int TaskID)
        {
            Console.WriteLine($"Received request to toggle task completion with ID: {TaskID}");
            var taskToUpdate = _context.Tasks.Find(TaskID);

            if(taskToUpdate == null)
            {
                return NotFound();
            }

            taskToUpdate.IsCompleted = !taskToUpdate.IsCompleted;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("edit/{TaskId}")]
        public IActionResult UpdateEditedTask(int TaskID, [FromBody] Task editedTask)
        {
            var editedTaskToUpdate = _context.Tasks.Find(TaskID);

            if(editedTaskToUpdate == null)
            {
                return NotFound();
            }
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Updating the fields in the database from the edited task
            editedTaskToUpdate.Title = editedTask.Title;
            editedTaskToUpdate.Description = editedTask.Description;
            editedTaskToUpdate.DueDate = editedTask.DueDate;

            _context.SaveChanges();

            return NoContent();
        }
    }
}
