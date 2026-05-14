using SaglikCell.Domain.Entities;

namespace SaglikCell.Application.Interfaces;

public interface IJwtTokenService
{
    (string Token, DateTimeOffset ExpiresAt) GenerateAccessToken(User user);
    string GenerateRefreshToken();
    DateTimeOffset GetRefreshTokenExpiry();
}
