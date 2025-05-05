using Microsoft.AspNetCore.Mvc;
using task_management.Server.Contracts;
using task_management.Server.Dto;

namespace task_management.Server.Controllers
{

    [Route("api/user")]
    [ApiController]

    public class UserController : Controller
    {

        private readonly IUserRepository _userRepo;
        protected ResponseDto _response;
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
            _response = new();
        }


        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _userRepo.GetUsers();

            if (result == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Error No User Found";
                return BadRequest(result);
            }

            _response.Result = result;
            _response.Message = "User Found Successfully";
            return Ok(_response);
        }
    }
}
