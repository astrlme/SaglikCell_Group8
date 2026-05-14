using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class GoalConfiguration : IEntityTypeConfiguration<Goal>
{
    public void Configure(EntityTypeBuilder<Goal> b)
    {
        b.ToTable("goals");
        b.HasKey(g => g.Id);

        b.Property(g => g.MetricType).HasColumnType("metric_type").IsRequired();
        b.Property(g => g.Period).HasColumnType("goal_period").IsRequired();
        b.Property(g => g.Status).HasColumnType("goal_status").IsRequired();
        b.Property(g => g.TargetValue).HasColumnType("decimal(10,2)").IsRequired();
        b.Property(g => g.CurrentStreak).HasDefaultValue(0);
        b.Property(g => g.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasIndex(g => new { g.UserId, g.Status });

        b.HasOne(g => g.User)
            .WithMany(u => u.Goals)
            .HasForeignKey(g => g.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
