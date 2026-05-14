using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;

namespace SaglikCell.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/profile")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profile;
    private readonly ICurrentUser _currentUser;

    public ProfileController(IProfileService profile, ICurrentUser currentUser)
    {
        _profile = profile;
        _currentUser = currentUser;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _profile.GetProfileAsync(userId);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] UpdateProfileRequest request)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _profile.UpdateProfileAsync(userId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}
