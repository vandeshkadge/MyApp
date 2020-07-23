using System.ComponentModel.DataAnnotations;

namespace MyApp.api.Dtos
{
    public class UserForLoginDto
    {
        
        public string Username { get; set; }


        
        public string Password { get; set; }
    }
}