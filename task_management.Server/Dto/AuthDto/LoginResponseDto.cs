namespace task_management.Server.Dto.AuthDto
{
    public class LoginResponseDto
    {
        public LoginUserDto User { get; set; }
        public string Token { get; set; }
    }
}
