using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Application.Interfaces;

public interface IGoalService
{
    Task<ApiResponse<GoalResponse>> CreateGoalAsync(Guid userId, GoalRequest request);
    Task<ApiResponse<List<GoalResponse>>> GetGoalsByUserAsync(Guid userId);
    Task<ApiResponse<GoalResponse>> UpdateGoalStatusAsync(Guid userId, Guid goalId, GoalStatus status);
    Task<ApiResponse<bool>> DeleteGoalAsync(Guid userId, Guid goalId);
}
