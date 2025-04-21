using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using task_management.Server.Contracts;
using task_management.Server.Data;
using task_management.Server.Dto.Tasks;
using task_management.Server.Models;

namespace task_management.Server.Repository
{
    public class TaskRepository : ITaskRepository
    {

        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        public TaskRepository(AppDbContext appDbContext, IMapper mapper)
        {
            _db = appDbContext;
            _mapper = mapper;
        }

        public async Task<string> CreateTask(TaskDto taskDto)
        {

            try
            {

                Models.Task task = new()
                {
                    Title = taskDto.Title,
                    Description = taskDto.Description,
                    Priority = taskDto.Priority,
                    CreatedBy = taskDto.CreatedBy,
                    TaskCompletionDate = taskDto.TaskCompletionDate,
                    StatusId = taskDto.StatusId,
                    CategoryId = taskDto.CategoryId,
                    IsActive = taskDto.IsActive,
                    CreatedOn = DateTime.Now
                };

                _db.Tasks.Add(task);
                await _db.SaveChangesAsync();

                return "";

            }
            catch(Exception)
            {

            }

            return "Error Encountered";

        }

        public async Task<string> UpdateTask(TaskDto taskDto)
        {
            try
            {

                Models.Task task = new()
                {
                    TaskId = taskDto.TaskId,
                    Title = taskDto.Title,
                    Description = taskDto.Description,
                    Priority = taskDto.Priority,
                    CreatedBy = taskDto.CreatedBy,
                    TaskCompletionDate = taskDto.TaskCompletionDate,
                    StatusId = taskDto.StatusId,
                    CategoryId = taskDto.CategoryId,
                    IsActive = taskDto.IsActive,
                    CreatedOn = DateTime.Now
                };

                _db.Tasks.Update(task);
                await _db.SaveChangesAsync();

                return "";

            }
            catch (Exception)
            {

            }

            return "Error Encountered";
        }

        public async Task<IEnumerable<TaskDto>> GetTasks()
        {

            var tasks = await _db.Tasks.Where(q => q.IsActive == true).ToListAsync();
            return _mapper.Map<List<TaskDto>>(tasks);

        }

        public async Task<TaskDto> GetTaskById(int taskId)
        {
            var task = _db.Tasks.FirstOrDefault(q => q.TaskId == taskId && q.IsActive == true);
            return _mapper.Map<TaskDto>(task);
        }

        public async Task<IEnumerable<TaskDto>> GetTasksPerUser(string UserId)
        {
            string id = UserId;
            var tasks = await _db.Tasks.Where(q => q.CreatedBy == id && q.IsActive == true).ToListAsync();
            return _mapper.Map<List<TaskDto>>(tasks);

        }

        public async Task<bool> DeleteTask(int taskId)
        {

            try
            {
                var task = _db.Tasks.FirstOrDefault(q => q.TaskId == taskId);

                task.IsActive = false;
                await _db.SaveChangesAsync();

                return true;

            }
            catch(Exception)
            {

            }

            return false;
            
        }
       

        //     ----------------------

 
        public async Task<string> CreateTaskCategory(CategoryDto categoryDto)
        {
            try
            {

                TaskCategory category = new()
                {
                    CategoryName = categoryDto.CategoryName
                };

                _db.TaskCategories.Add(category);
                await _db.SaveChangesAsync();

                return "";

            }
            catch (Exception)
            {

            }

            return "Error Encountered";
        }

     
        public async Task<string> CreateTaskStatus(StatusDto statusDto)
        {
            try
            {

                Models.TaskStatus status = new()
                {
                    StatusName = statusDto.StatusName
                };

                _db.TaskStatuses.Add(status);
                await _db.SaveChangesAsync();

                return "";

            }
            catch (Exception)
            {

            }

            return "Error Encountered";
        }
    }
}
