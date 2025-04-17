using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using task_management.Server.Models;

namespace task_management.Server.Dto.Tasks
{
    public class TaskDto
    {

        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }

        public string CreatedBy { get; set; }
        public DateTime TaskCompletionDate { get; set; }


        public Models.TaskStatus TaskStatus { get; set; }
        public int StatusId { get; set; }


        public TaskCategory TaskCategory { get; set; }
        public int CategoryId { get; set; }


        public bool IsActive { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
