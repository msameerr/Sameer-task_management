using System.ComponentModel.DataAnnotations;

namespace task_management.Server.Models
{
    public class TaskCategory
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
