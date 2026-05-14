using Microsoft.EntityFrameworkCore;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Entities;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Application.Services;

public class MetricService : IMetricService
{
    private readonly IAppDbContext _db;

    public MetricService(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<MetricResponse>> AddMetricAsync(Guid userId, MetricRequest request)
    {
        if (!ValidateMetricRange(request.MetricType, request.Value, out var error))
        {
            return ApiResponse<MetricResponse>.Fail(error);
        }

        var entity = new HealthMetric
        {
            UserId = userId,
            MetricType = request.MetricType,
            Value = request.Value,
            RecordedDate = request.RecordedDate,
        };

        _db.HealthMetrics.Add(entity);
        await _db.SaveChangesAsync();

        return ApiResponse<MetricResponse>.Ok(Map(entity), "Metrik kaydedildi.");
    }

    public async Task<ApiResponse<List<MetricResponse>>> GetMetricsByUserAsync(Guid userId)
    {
        var list = await _db.HealthMetrics
            .Where(m => m.UserId == userId)
            .OrderByDescending(m => m.RecordedDate)
            .ThenByDescending(m => m.CreatedAt)
            .Select(m => Map(m))
            .ToListAsync();
        return ApiResponse<List<MetricResponse>>.Ok(list);
    }

    public async Task<ApiResponse<List<MetricResponse>>> GetMetricsByTypeAsync(Guid userId, MetricType metricType)
    {
        var list = await _db.HealthMetrics
            .Where(m => m.UserId == userId && m.MetricType == metricType)
            .OrderByDescending(m => m.RecordedDate)
            .ThenByDescending(m => m.CreatedAt)
            .Select(m => Map(m))
            .ToListAsync();
        return ApiResponse<List<MetricResponse>>.Ok(list);
    }

    public async Task<ApiResponse<bool>> DeleteMetricAsync(Guid userId, Guid metricId)
    {
        var entity = await _db.HealthMetrics.FirstOrDefaultAsync(m => m.Id == metricId && m.UserId == userId);
        if (entity is null) return ApiResponse<bool>.Fail("Metrik bulunamadı.");

        _db.HealthMetrics.Remove(entity);
        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Metrik silindi.");
    }

    private static MetricResponse Map(HealthMetric m) => new()
    {
        Id = m.Id,
        UserId = m.UserId,
        MetricType = m.MetricType,
        Value = m.Value,
        RecordedDate = m.RecordedDate,
        CreatedAt = m.CreatedAt,
    };

    private static bool ValidateMetricRange(MetricType type, decimal value, out string error)
    {
        error = string.Empty;
        var (min, max) = type switch
        {
            MetricType.STEPS => (0m, 100_000m),
            MetricType.WATER => (0m, 10_000m),
            MetricType.SLEEP => (0m, 24m),
            MetricType.WEIGHT => (20m, 300m),
            MetricType.HEART_RATE => (30m, 250m),
            MetricType.CALORIES => (0m, 10_000m),
            _ => (0m, decimal.MaxValue),
        };

        if (value < min || value > max)
        {
            error = $"{type} değeri {min} - {max} aralığında olmalıdır.";
            return false;
        }

        return true;
    }
}
