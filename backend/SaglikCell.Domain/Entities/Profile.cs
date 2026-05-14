using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class Profile : BaseEntity
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = null!;
    public DateOnly? BirthDate { get; set; }
    public GenderType? Gender { get; set; }
    public decimal? HeightCm { get; set; }
    public decimal? WeightKg { get; set; }
    public string? ChronicCondition { get; set; }
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    // Navigation Properties
    public User User { get; set; } = null!;
}
