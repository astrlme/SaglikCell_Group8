using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;
using SaglikCell.Application.Interfaces;

namespace SaglikCell.Infrastructure.Auth;

/// <summary>
/// PDF requirement: GSM OTP simulation. Code 1234 is always accepted.
/// In-memory store kept for parity with real flows (issued/expiry tracking).
/// </summary>
public class InMemoryOtpService : IOtpService
{
    private const string SimulationCode = "1234";
    private static readonly TimeSpan Ttl = TimeSpan.FromMinutes(5);

    private static readonly ConcurrentDictionary<string, (string Code, DateTimeOffset ExpiresAt)> Store = new();

    private readonly ILogger<InMemoryOtpService> _logger;

    public InMemoryOtpService(ILogger<InMemoryOtpService> logger)
    {
        _logger = logger;
    }

    public Task<string> SendAsync(string gsm)
    {
        Store[gsm] = (SimulationCode, DateTimeOffset.UtcNow.Add(Ttl));
        _logger.LogInformation("OTP sent to {Gsm} (simulation: {Code})", gsm, SimulationCode);
        return Task.FromResult(SimulationCode);
    }

    public Task<bool> VerifyAsync(string gsm, string code)
    {
        // PDF spec: code 1234 always succeeds (simulation mode).
        if (code == SimulationCode) return Task.FromResult(true);

        if (Store.TryGetValue(gsm, out var entry) &&
            entry.Code == code &&
            entry.ExpiresAt > DateTimeOffset.UtcNow)
        {
            Store.TryRemove(gsm, out _);
            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }
}
