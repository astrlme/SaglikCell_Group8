using Microsoft.EntityFrameworkCore;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Entities;

namespace SaglikCell.Application.Services;

public class AuthService : IAuthService
{
    private readonly IAppDbContext _db;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenService _jwt;
    private readonly IOtpService _otp;

    public AuthService(
        IAppDbContext db,
        IPasswordHasher hasher,
        IJwtTokenService jwt,
        IOtpService otp)
    {
        _db = db;
        _hasher = hasher;
        _jwt = jwt;
        _otp = otp;
    }

    public async Task<ApiResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
    {
        var gsm = NormalizeGsm(request.Gsm);

        var exists = await _db.Users.AnyAsync(u => u.Gsm == gsm);
        if (exists)
        {
            throw new SaglikCell.Application.Exceptions.ConflictException("Bu GSM numarası zaten kayıtlı.");
        }

        var user = new User
        {
            Gsm = gsm,
            PasswordHash = _hasher.Hash(request.Password),
            IsVerified = false,
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        await _otp.SendAsync(gsm);

        return ApiResponse<RegisterResponse>.Ok(new RegisterResponse
        {
            UserId = user.Id,
            Gsm = user.Gsm,
        }, "Kayıt başarılı. OTP kodu gönderildi (simülasyon: 1234).");
    }

    public async Task<ApiResponse<bool>> VerifyGsmAsync(VerifyOtpRequest request)
    {
        var gsm = NormalizeGsm(request.Gsm);

        var ok = await _otp.VerifyAsync(gsm, request.Code);
        if (!ok) throw new SaglikCell.Application.Exceptions.ValidationException("OTP kodu geçersiz.");

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Gsm == gsm);
        if (user is null) throw new SaglikCell.Application.Exceptions.NotFoundException("Kullanıcı bulunamadı.");

        user.IsVerified = true;
        await _db.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true, "GSM doğrulandı.");
    }

    public async Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var gsm = NormalizeGsm(request.Gsm);

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Gsm == gsm);
        if (user is null || string.IsNullOrEmpty(user.PasswordHash))
        {
            throw new SaglikCell.Application.Exceptions.ValidationException("GSM veya şifre hatalı.");
        }

        if (!_hasher.Verify(request.Password, user.PasswordHash))
        {
            throw new SaglikCell.Application.Exceptions.ValidationException("GSM veya şifre hatalı.");
        }

        if (!user.IsVerified)
        {
            throw new SaglikCell.Application.Exceptions.ValidationException("GSM numaranız doğrulanmamış. Lütfen önce OTP doğrulayın.");
        }

        var auth = await IssueTokensAsync(user);
        return ApiResponse<AuthResponse>.Ok(auth, "Giriş başarılı.");
    }

    public async Task<ApiResponse<AuthResponse>> RefreshTokenAsync(string refreshToken)
    {
        var existing = await _db.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken);

        if (existing is null || !existing.IsActive)
        {
            throw new SaglikCell.Application.Exceptions.ValidationException("Refresh token geçersiz veya süresi dolmuş.");
        }

        existing.RevokedAt = DateTimeOffset.UtcNow;

        var auth = await IssueTokensAsync(existing.User);
        existing.ReplacedByToken = auth.RefreshToken;

        await _db.SaveChangesAsync();
        return ApiResponse<AuthResponse>.Ok(auth, "Token yenilendi.");
    }

    public async Task<ApiResponse<bool>> LogoutAsync(string refreshToken)
    {
        var existing = await _db.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
        if (existing is null || !existing.IsActive)
        {
            return ApiResponse<bool>.Ok(true, "Zaten çıkış yapılmış.");
        }

        existing.RevokedAt = DateTimeOffset.UtcNow;
        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Çıkış yapıldı.");
    }

    private async Task<AuthResponse> IssueTokensAsync(User user)
    {
        var (accessToken, expiresAt) = _jwt.GenerateAccessToken(user);
        var refresh = _jwt.GenerateRefreshToken();

        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId = user.Id,
            Token = refresh,
            ExpiresAt = _jwt.GetRefreshTokenExpiry(),
        });
        await _db.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refresh,
            ExpiresAt = expiresAt,
        };
    }

    private static string NormalizeGsm(string gsm)
    {
        var trimmed = gsm.Trim().Replace(" ", string.Empty);
        return trimmed;
    }
}
