using Microsoft.EntityFrameworkCore;

namespace taskmaster_api.Data
{
    public class TaskmasterDbContext : DbContext
    {
        public TaskmasterDbContext(DbContextOptions<TaskmasterDbContext> options) : base(options) { }

        // Add DbSet properties for your entities
        // public DbSet<YourEntity> YourEntities { get; set; }

        // Add DbSet property for the Task entity
        public DbSet<Task> Tasks { get; set; }
    }
}
