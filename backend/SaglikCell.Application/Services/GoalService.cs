using Microsoft.EntityFrameworkCore;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Entities;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Application.Services;

public class GoalService : IGoalService
{
    private readonly IAppDbContext _db;

    public GoalService(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<GoalResponse>> CreateGoalAsync(Guid userId, GoalRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null) return ApiResponse<GoalResponse>.Fail("Kullanıcı bulunamadı.");

        if (user.Role == UserRole.FREE)
        {
            var activeCount = await _db.Goals
                .CountAsync(g => g.UserId == userId && g.Status == GoalStatus.ACTIVE);
            if (activeCount >= 1)
            {
                return ApiResponse<GoalResponse>.Fail(
                    "Ücretsiz kullanıcılar yalnızca 1 aktif hedefe sahip olabilir. Premium'a yükseltin.");
            }
        }

        var goal = new Goal
        {
            UserId = userId,
            MetricType = request.MetricType,
            TargetValue = request.TargetValue,
            Period = request.Period,
        };

        _db.Goals.Add(goal);
        await _db.SaveChangesAsync();

        return ApiResponse<GoalResponse>.Ok(Map(goal), "Hedef oluşturuldu.");
    }

    public async Task<ApiResponse<List<GoalResponse>>> GetGoalsByUserAsync(Guid userId)
    {
        var list = await _db.Goals
            .Where(g => g.UserId == userId)
            .OrderByDescending(g => g.CreatedAt)
            .Select(g => Map(g))
            .ToListAsync();
        return ApiResponse<List<GoalResponse>>.Ok(list);
    }

    public async Task<ApiResponse<GoalResponse>> UpdateGoalStatusAsync(Guid userId, Guid goalId, GoalStatus status)
    {
        var goal = await _db.Goals.FirstOrDefaultAsync(g => g.Id == goalId && g.UserId == userId);
        if (goal is null) return ApiResponse<GoalResponse>.Fail("Hedef bulunamadı.");

        goal.Status = status;
        await _db.SaveChangesAsync();
        return ApiResponse<GoalResponse>.Ok(Map(goal), "Hedef güncellendi.");
    }

    public async Task<ApiResponse<bool>> DeleteGoalAsync(Guid userId, Guid goalId)
    {
        var goal = await _db.Goals.FirstOrDefaultAsync(g => g.Id == goalId && g.UserId == userId);
        if (goal is null) return ApiResponse<bool>.Fail("Hedef bulunamadı.");

        _db.Goals.Remove(goal);
        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Hedef silindi.");
    }

    private static GoalResponse Map(Goal g) => new()
    {
        Id = g.Id,
        UserId = g.UserId,
        MetricType = g.MetricType,
        TargetValue = g.TargetValue,
        Period = g.Period,
        CurrentStreak = g.CurrentStreak,
        Status = g.Status,
        CreatedAt = g.CreatedAt,
    };
}
