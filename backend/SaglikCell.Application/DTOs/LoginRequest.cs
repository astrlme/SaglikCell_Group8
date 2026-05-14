using System.ComponentModel.DataAnnotations;

namespace SaglikCell.Domain.DTOs;

public class LoginRequest
{
    [Required(ErrorMessage = "GSM numarası zorunludur.")]
    [Phone(ErrorMessage = "Geçerli bir telefon numarası giriniz.")]
    public string Gsm { get; set; } = null!;

    [Required(ErrorMessage = "Şifre zorunludur.")]
    public string Password { get; set; } = null!;
}
