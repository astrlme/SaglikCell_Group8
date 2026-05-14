using System.Security.Claims;
using SaglikCell.Application.Interfaces;

namespace SaglikCell.Api.Auth;

public class CurrentUser : ICurrentUser
{
    private readonly IHttpContextAccessor _accessor;

    public CurrentUser(IHttpContextAccessor accessor)
    {
        _accessor = accessor;
    }

    public Guid? UserId
    {
        get
        {
            var sub = _accessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier)
                   ?? _accessor.HttpContext?.User?.FindFirstValue("sub");
            return Guid.TryParse(sub, out var id) ? id : null;
        }
    }

    public bool IsAuthenticated => _accessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
}
