using Microsoft.AspNetCore.Identity;
using task_management.Server.Contracts;
using task_management.Server.Data;
using task_management.Server.Dto.AuthDto;
using task_management.Server.Models;

namespace task_management.Server.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserRepository(AppDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync("USER");

            var userList = new List<UserDto>();

            foreach (var userData in usersInRole)
            {
                UserDto user = new()
                {
                    ID = userData.Id,
                    Name = userData.Name,
                    Email = userData.Email,
                    CreatedOn = userData.CreatedOn
                };

                userList.Add(user);
            }

            return userList;
        }

    }
}
