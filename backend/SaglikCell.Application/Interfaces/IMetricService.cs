using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Application.Interfaces;

public interface IMetricService
{
    Task<ApiResponse<MetricResponse>> AddMetricAsync(Guid userId, MetricRequest request);
    Task<ApiResponse<List<MetricResponse>>> GetMetricsByUserAsync(Guid userId);
    Task<ApiResponse<List<MetricResponse>>> GetMetricsByTypeAsync(Guid userId, MetricType metricType);
    Task<ApiResponse<bool>> DeleteMetricAsync(Guid userId, Guid metricId);
}
