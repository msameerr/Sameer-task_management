using task_management.Server.Dto.AuthDto;

namespace task_management.Server.Contracts
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetUsers();
    }
}
