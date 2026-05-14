using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> b)
    {
        b.ToTable("notifications");
        b.HasKey(n => n.Id);

        b.Property(n => n.Type).HasColumnType("notification_type").IsRequired();
        b.Property(n => n.Message).HasMaxLength(500).IsRequired();
        b.Property(n => n.IsRead).HasDefaultValue(false);
        b.Property(n => n.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasIndex(n => new { n.UserId, n.IsRead });

        b.HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
