using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Infrastructure.Configuration;

public class ProfileConfiguration : IEntityTypeConfiguration<Profile>
{
    public void Configure(EntityTypeBuilder<Profile> b)
    {
        b.ToTable("profiles");
        b.HasKey(p => p.Id);

        b.Property(p => p.FullName).HasMaxLength(120).IsRequired();
        b.Property(p => p.Gender).HasColumnType("gender_type");
        b.Property(p => p.HeightCm).HasColumnType("decimal(5,2)");
        b.Property(p => p.WeightKg).HasColumnType("decimal(5,2)");
        b.Property(p => p.ChronicCondition).HasMaxLength(500);
        b.Property(p => p.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        b.Property(p => p.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        b.HasIndex(p => p.UserId).IsUnique();
    }
}
