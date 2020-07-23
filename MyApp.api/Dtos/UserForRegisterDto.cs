using System.ComponentModel.DataAnnotations;

namespace MyApp.api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Passwrod must be Between 4 and 8 Char")]
        public string Password { get; set; }
    }
}