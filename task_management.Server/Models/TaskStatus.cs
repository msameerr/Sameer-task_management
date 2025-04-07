using System.ComponentModel.DataAnnotations;

namespace task_management.Server.Models
{
    public class TaskStatus
    {

        [Key]
        public int StatusId { get; set; }
        [Required]
        public string StatusName { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
