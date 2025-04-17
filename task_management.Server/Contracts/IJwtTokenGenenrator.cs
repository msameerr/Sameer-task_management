using task_management.Server.Models;

namespace task_management.Server.Contracts
{
    public interface IJwtTokenGenenrator
    {
        public string GenerateToken(ApplicationUser applicationUser, IEnumerable<String> Roles);
    }
}
