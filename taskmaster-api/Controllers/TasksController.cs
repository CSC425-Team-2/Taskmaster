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

        // ... controller code ...

        [HttpGet("{id}")]
        public IActionResult GetTask(int id)
        {
            var task = _context.Tasks.Find(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
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

            return CreatedAtAction(nameof(GetTask), new { id = task.TaskID }, task);
        }

        [HttpGet("byUsername/{username}")]
        public IActionResult GetTasksByUsername(string username)
        {
            try
            {
                var tasks = _context.Tasks.Where(t => t.Username == username).ToList();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
