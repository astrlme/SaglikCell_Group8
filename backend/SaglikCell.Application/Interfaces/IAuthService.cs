using SaglikCell.Domain.DTOs;

namespace SaglikCell.Application.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<string>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<string>> LoginAsync(LoginRequest request);
    Task<ApiResponse<bool>> VerifyGsmAsync(string gsm, string code);
}
