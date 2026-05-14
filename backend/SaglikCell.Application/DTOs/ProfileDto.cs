using System.ComponentModel.DataAnnotations;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.DTOs;

public class ProfileResponse
{
    public Guid UserId { get; set; }
    public string Gsm { get; set; } = null!;
    public UserRole Role { get; set; }
    public bool IsVerified { get; set; }
    public string? FullName { get; set; }
    public DateOnly? BirthDate { get; set; }
    public GenderType? Gender { get; set; }
    public decimal? HeightCm { get; set; }
    public decimal? WeightKg { get; set; }
    public string? ChronicCondition { get; set; }
    public decimal? Bmi { get; set; }
    public string? BmiCategory { get; set; }
}

public class UpdateProfileRequest
{
    [StringLength(120, ErrorMessage = "Ad soyad en fazla 120 karakter olabilir.")]
    public string? FullName { get; set; }

    public DateOnly? BirthDate { get; set; }

    public GenderType? Gender { get; set; }

    [Range(50, 250, ErrorMessage = "Boy 50 ile 250 cm arasında olmalıdır.")]
    public decimal? HeightCm { get; set; }

    [Range(20, 300, ErrorMessage = "Kilo 20 ile 300 kg arasında olmalıdır.")]
    public decimal? WeightKg { get; set; }

    [StringLength(500)]
    public string? ChronicCondition { get; set; }
}
