using Microsoft.AspNetCore.Mvc;
using task_management.Server.Contracts;
using task_management.Server.Dto;
using task_management.Server.Dto.Tasks;

namespace task_management.Server.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : Controller
    {

        private readonly ITaskRepository _taskRepo;
        protected ResponseDto _response;

        public TaskController(ITaskRepository taskRepo)
        {
            _taskRepo = taskRepo;
            _response = new();
        }


        [HttpPost("Create")]
        public async Task<IActionResult> CreateTask([FromBody] TaskDto taskDto)
        {

            var result = await _taskRepo.CreateTask(taskDto);

            if(!string.IsNullOrEmpty(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(result);
            }

            return Ok(_response);

        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskDto taskDto)
        {

            var result = await _taskRepo.UpdateTask(taskDto);

            if (!string.IsNullOrEmpty(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(result);
            }

            return Ok(_response);

        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllTasks()
        {

            var result = await _taskRepo.GetTasks();

            if (result == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Error No Task Found";
                return BadRequest(result);
            }

            _response.Result = result;
            _response.Message = " ";
            return Ok(_response);

        }

        [HttpGet("GetTaskById")]
        public async Task<IActionResult> GetTaskById(int id)
        {

            var result = await _taskRepo.GetTaskById(id);

            if (result == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Error No Task Found";
                return BadRequest(result);
            }

            _response.Result = result;
            _response.Message = " ";
            return Ok(_response);

        }

        [HttpGet("GetUserTasks")]
        public async Task<IActionResult> GetUserTasks()
        {

            var result = await _taskRepo.GetTasksPerUser();

            if (result == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Error No Task Found";
                return BadRequest(result);
            }
            
            _response.Result = result;
            _response.Message = " ";
            return Ok(_response);

        }

        [HttpPut("Delete")]
        public async Task<IActionResult> DeleteTask(int id)
        {

            var result = await _taskRepo.DeleteTask(id);

            if (!result)
            {
                _response.IsSuccess = false;
                _response.Message = "Error in Deleting Task";
                return BadRequest(result);
            }

            return Ok(_response);

        }


        // ------------------

        [HttpPost("Category")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto categoryDto)
        {

            var result = await _taskRepo.CreateTaskCategory(categoryDto);

            if (!string.IsNullOrEmpty(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(result);
            }

            return Ok(_response);

        }

        [HttpPost("Status")]
        public async Task<IActionResult> CreateStatus([FromBody] StatusDto statusDto)
        {

            var result = await _taskRepo.CreateTaskStatus(statusDto);

            if (!string.IsNullOrEmpty(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(result);
            }

            return Ok(_response);

        }

    }
}
