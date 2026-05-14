namespace SaglikCell.Application.Interfaces;

public interface IOtpService
{
    Task<string> SendAsync(string gsm);
    Task<bool> VerifyAsync(string gsm, string code);
}
