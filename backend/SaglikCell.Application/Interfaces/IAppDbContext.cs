using Microsoft.EntityFrameworkCore;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Application.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; }
    DbSet<Profile> Profiles { get; }
    DbSet<HealthMetric> HealthMetrics { get; }
    DbSet<Goal> Goals { get; }
    DbSet<Subscription> Subscriptions { get; }
    DbSet<Notification> Notifications { get; }
    DbSet<RefreshToken> RefreshTokens { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
