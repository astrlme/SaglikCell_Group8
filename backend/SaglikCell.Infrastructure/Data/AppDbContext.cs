using Microsoft.EntityFrameworkCore;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.Entities;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Infrastructure.Data;

public class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<HealthMetric> HealthMetrics => Set<HealthMetric>();
    public DbSet<Goal> Goals => Set<Goal>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var translator = new Npgsql.NameTranslation.NpgsqlNullNameTranslator();
        modelBuilder.HasPostgresEnum<UserRole>("user_role", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<GenderType>("gender_type", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<MetricType>("metric_type", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<GoalPeriod>("goal_period", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<GoalStatus>("goal_status", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<SubscriptionStatus>("subscription_status", nameTranslator: translator);
        modelBuilder.HasPostgresEnum<NotificationType>("notification_type", nameTranslator: translator);

        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
