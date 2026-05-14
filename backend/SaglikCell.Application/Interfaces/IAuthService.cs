using SaglikCell.Domain.DTOs;

namespace SaglikCell.Application.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<RegisterResponse>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request);
    Task<ApiResponse<bool>> VerifyGsmAsync(VerifyOtpRequest request);
    Task<ApiResponse<AuthResponse>> RefreshTokenAsync(string refreshToken);
    Task<ApiResponse<bool>> LogoutAsync(string refreshToken);
}
