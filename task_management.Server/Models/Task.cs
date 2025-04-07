using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace task_management.Server.Models
{
    public class Task
    {

        [Key]
        public int TaskId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get;set; }
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        public int Priority { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime TaskCompletionDate { get; set; }


        [ForeignKey("StatusId")]
        public TaskStatus TaskStatus { get; set; }
        public int StatusId { get; set; }


        [ForeignKey("CategoryId")]
        public TaskCategory TaskCategory { get; set; }
        public int CategoryId { get; set; }


        public bool IsActive { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
