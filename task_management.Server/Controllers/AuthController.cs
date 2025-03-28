using Microsoft.AspNetCore.Mvc;
using task_management.Server.Contracts;
using task_management.Server.Dto;
using task_management.Server.Dto.AuthDto;

namespace task_management.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {

        private readonly IAuthRepository _authRepository;
        protected ResponseDto _response;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
            _response = new();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto registrationRequestDto)
        {
            var result = await _authRepository.Register(registrationRequestDto);

            if (!string.IsNullOrEmpty(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(result);
            }

            return Ok(_response);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            var result = await _authRepository.Login(model);

            if (result.User == null)
            {
                _response.IsSuccess = false;
                _response.Message = "UserName or  Password Incorrect";
                return BadRequest(_response);
            }

            _response.Result = result;
            return Ok(_response);
        }


        [HttpPost("CreateAdmin")]
        public async Task<IActionResult> AssignRole([FromBody] RegistrationRequestDto model)
        {

            var assignRoleSuccessfully = await _authRepository.AssignRole(model.Email, "ADMIN");

            if (!assignRoleSuccessfully)
            {
                _response.IsSuccess = false;
                _response.Message = "Error Encountered";
                return BadRequest(_response);
            }

            _response.Result = assignRoleSuccessfully;
            return Ok(_response);
        }

    }
}
