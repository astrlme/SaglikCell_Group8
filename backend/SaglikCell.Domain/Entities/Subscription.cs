using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class Subscription : BaseEntity
{
    public Guid UserId { get; set; }
    public string Provider { get; set; } = "PAYCELL";
    public string? CardNumberMasked { get; set; }
    public SubscriptionStatus Status { get; set; }
    public DateTimeOffset? StartedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? EndedAt { get; set; }

    // Navigation Properties
    public User User { get; set; } = null!;
}
