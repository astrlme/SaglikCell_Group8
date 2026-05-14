using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> b)
    {
        b.ToTable("subscriptions");
        b.HasKey(s => s.Id);

        b.Property(s => s.Provider).HasMaxLength(40);
        b.Property(s => s.CardNumberMasked).HasMaxLength(25);
        b.Property(s => s.Status).HasColumnType("subscription_status");
        b.Property(s => s.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasIndex(s => new { s.UserId, s.Status });

        b.HasOne(s => s.User)
            .WithMany(u => u.Subscriptions)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
