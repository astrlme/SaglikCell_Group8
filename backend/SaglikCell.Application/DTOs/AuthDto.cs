using System.ComponentModel.DataAnnotations;

namespace SaglikCell.Domain.DTOs;

public class AuthResponse
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTimeOffset ExpiresAt { get; set; }
    public string TokenType { get; set; } = "Bearer";
}

public class RefreshTokenRequest
{
    [Required(ErrorMessage = "Refresh token zorunludur.")]
    public string RefreshToken { get; set; } = null!;
}

public class VerifyOtpRequest
{
    [Required(ErrorMessage = "GSM numarası zorunludur.")]
    [Phone(ErrorMessage = "Geçerli bir telefon numarası giriniz.")]
    public string Gsm { get; set; } = null!;

    [Required(ErrorMessage = "OTP kodu zorunludur.")]
    [StringLength(4, MinimumLength = 4, ErrorMessage = "OTP kodu 4 haneli olmalıdır.")]
    public string Code { get; set; } = null!;
}

public class RegisterResponse
{
    public Guid UserId { get; set; }
    public string Gsm { get; set; } = null!;
    public string Message { get; set; } = "OTP kodu gönderildi (simülasyon: 1234).";
}
