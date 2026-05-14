using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class User : BaseEntity
{
    public string Gsm { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public UserRole Role { get; set; } = UserRole.FREE;
    public bool IsVerified { get; set; } = false;

    // Navigation Properties
    public Profile? Profile { get; set; }
    public ICollection<HealthMetric> HealthMetrics { get; set; } = new List<HealthMetric>();
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
