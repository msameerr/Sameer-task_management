using task_management.Server.Dto.AuthDto;

namespace task_management.Server.Contracts
{
    public interface IAuthRepository
    {
        Task<string> Register(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string roleName);

    }
}
