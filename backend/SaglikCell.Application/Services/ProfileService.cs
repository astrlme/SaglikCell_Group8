using Microsoft.EntityFrameworkCore;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Application.Services;

public class ProfileService : IProfileService
{
    private readonly IAppDbContext _db;

    public ProfileService(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<ProfileResponse>> GetProfileAsync(Guid userId)
    {
        var user = await _db.Users
            .Include(u => u.Profile)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null) return ApiResponse<ProfileResponse>.Fail("Kullanıcı bulunamadı.");

        return ApiResponse<ProfileResponse>.Ok(MapToResponse(user));
    }

    public async Task<ApiResponse<ProfileResponse>> UpdateProfileAsync(Guid userId, UpdateProfileRequest request)
    {
        var user = await _db.Users
            .Include(u => u.Profile)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null) return ApiResponse<ProfileResponse>.Fail("Kullanıcı bulunamadı.");

        if (user.Profile is null)
        {
            user.Profile = new Profile
            {
                UserId = user.Id,
                FullName = request.FullName ?? string.Empty,
            };
            _db.Profiles.Add(user.Profile);
        }

        if (request.FullName is not null) user.Profile.FullName = request.FullName;
        if (request.BirthDate is not null) user.Profile.BirthDate = request.BirthDate;
        if (request.Gender is not null) user.Profile.Gender = request.Gender;
        if (request.HeightCm is not null) user.Profile.HeightCm = request.HeightCm;
        if (request.WeightKg is not null) user.Profile.WeightKg = request.WeightKg;
        if (request.ChronicCondition is not null) user.Profile.ChronicCondition = request.ChronicCondition;
        user.Profile.UpdatedAt = DateTimeOffset.UtcNow;

        await _db.SaveChangesAsync();
        return ApiResponse<ProfileResponse>.Ok(MapToResponse(user), "Profil güncellendi.");
    }

    private static ProfileResponse MapToResponse(User user)
    {
        var p = user.Profile;
        var bmi = CalculateBmi(p?.HeightCm, p?.WeightKg);
        return new ProfileResponse
        {
            UserId = user.Id,
            Gsm = user.Gsm,
            Role = user.Role,
            IsVerified = user.IsVerified,
            FullName = p?.FullName,
            BirthDate = p?.BirthDate,
            Gender = p?.Gender,
            HeightCm = p?.HeightCm,
            WeightKg = p?.WeightKg,
            ChronicCondition = p?.ChronicCondition,
            Bmi = bmi,
            BmiCategory = CategorizeBmi(bmi),
        };
    }

    private static decimal? CalculateBmi(decimal? heightCm, decimal? weightKg)
    {
        if (heightCm is null or <= 0 || weightKg is null or <= 0) return null;
        var heightM = heightCm.Value / 100m;
        return Math.Round(weightKg.Value / (heightM * heightM), 2);
    }

    private static string? CategorizeBmi(decimal? bmi) => bmi switch
    {
        null => null,
        < 18.5m => "Zayıf",
        < 25m => "Normal",
        < 30m => "Fazla Kilolu",
        _ => "Obez",
    };
}
