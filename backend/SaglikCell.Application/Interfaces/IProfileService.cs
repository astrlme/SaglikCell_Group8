using SaglikCell.Domain.DTOs;

namespace SaglikCell.Application.Interfaces;

public interface IProfileService
{
    Task<ApiResponse<ProfileResponse>> GetProfileAsync(Guid userId);
    Task<ApiResponse<ProfileResponse>> UpdateProfileAsync(Guid userId, UpdateProfileRequest request);
}
