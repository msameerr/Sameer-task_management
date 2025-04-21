using System.Security.Claims;
using task_management.Server.Dto.Tasks;

namespace task_management.Server.Contracts
{
    public interface ITaskRepository
    {

        Task<IEnumerable<TaskDto>> GetTasks();
        Task<TaskDto> GetTaskById(int taskId);
        Task<string> CreateTask(TaskDto taskDto);
        Task<IEnumerable<TaskDto>> GetTasksPerUser(string UserId);
        Task<string> UpdateTask(TaskDto taskDto);
        Task<bool> DeleteTask(int taskId);



        Task<string> CreateTaskStatus(StatusDto statusDto);
        Task<string> CreateTaskCategory(CategoryDto categoryDto);

    }
}
