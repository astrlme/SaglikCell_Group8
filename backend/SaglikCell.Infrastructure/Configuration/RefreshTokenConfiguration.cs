using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> b)
    {
        b.ToTable("refresh_tokens");
        b.HasKey(t => t.Id);

        b.Property(t => t.Token).HasMaxLength(200).IsRequired();
        b.Property(t => t.ReplacedByToken).HasMaxLength(200);
        b.Property(t => t.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasIndex(t => t.Token).IsUnique();
        b.HasIndex(t => new { t.UserId, t.RevokedAt });

        b.Ignore(t => t.IsActive);

        b.HasOne(t => t.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
