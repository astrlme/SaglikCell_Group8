using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> b)
    {
        b.ToTable("users");
        b.HasKey(u => u.Id);

        b.Property(u => u.Gsm).HasMaxLength(20).IsRequired();
        b.HasIndex(u => u.Gsm).IsUnique();

        b.Property(u => u.PasswordHash).HasMaxLength(255);

        b.Property(u => u.Role).HasColumnType("user_role");

        b.Property(u => u.IsVerified).HasDefaultValue(false);
        b.Property(u => u.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<Profile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
