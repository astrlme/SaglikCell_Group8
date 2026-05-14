using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class Goal : BaseEntity
{
    public Guid UserId { get; set; }
    public MetricType MetricType { get; set; }
    public decimal TargetValue { get; set; }
    public GoalPeriod Period { get; set; }
    public int CurrentStreak { get; set; } = 0;
    public GoalStatus Status { get; set; } = GoalStatus.ACTIVE;

    // Navigation Properties
    public User User { get; set; } = null!;
}
