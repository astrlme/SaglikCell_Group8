using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class HealthMetricConfiguration : IEntityTypeConfiguration<HealthMetric>
{
    public void Configure(EntityTypeBuilder<HealthMetric> b)
    {
        b.ToTable("health_metrics");
        b.HasKey(m => m.Id);

        b.Property(m => m.MetricType).HasColumnType("metric_type").IsRequired();

        b.Property(m => m.Value).HasColumnType("decimal(10,2)").IsRequired();
        b.Property(m => m.RecordedDate).IsRequired();
        b.Property(m => m.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        // Composite index per spec: user_id + metric_type + recorded_date
        b.HasIndex(m => new { m.UserId, m.MetricType, m.RecordedDate })
            .HasDatabaseName("ix_health_metrics_user_type_date");

        b.HasOne(m => m.User)
            .WithMany(u => u.HealthMetrics)
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
