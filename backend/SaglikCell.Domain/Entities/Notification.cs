using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.Entities;

public class Notification : BaseEntity
{
    public Guid UserId { get; set; }
    public NotificationType Type { get; set; }
    public string Message { get; set; } = null!;
    public bool IsRead { get; set; } = false;

    // Navigation Properties
    public User User { get; set; } = null!;
}
