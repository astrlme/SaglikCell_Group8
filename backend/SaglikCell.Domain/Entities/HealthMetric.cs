using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class HealthMetric : BaseEntity
{
    public Guid UserId { get; set; }
    public MetricType MetricType { get; set; }
    public decimal Value { get; set; }
    public DateOnly RecordedDate { get; set; }

    // Navigation Properties
    public User User { get; set; } = null!;
}
