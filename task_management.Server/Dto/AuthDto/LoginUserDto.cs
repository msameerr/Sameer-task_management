namespace task_management.Server.Dto.AuthDto
{
    public class LoginUserDto
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Role { get; set; }
    }
}
