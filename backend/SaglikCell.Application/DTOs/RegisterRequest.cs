using System.ComponentModel.DataAnnotations;

namespace SaglikCell.Domain.DTOs;

public class RegisterRequest
{
    [Required(ErrorMessage = "GSM numarası zorunludur.")]
    [Phone(ErrorMessage = "Geçerli bir telefon numarası giriniz.")]
    [StringLength(20, ErrorMessage = "GSM numarası en fazla 20 karakter olabilir.")]
    public string Gsm { get; set; } = null!;

    [Required(ErrorMessage = "Şifre zorunludur.")]
    [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır.")]
    public string Password { get; set; } = null!;

    [Required(ErrorMessage = "Şifre tekrarı zorunludur.")]
    [Compare("Password", ErrorMessage = "Şifreler eşleşmiyor.")]
    public string PasswordConfirm { get; set; } = null!;
}
