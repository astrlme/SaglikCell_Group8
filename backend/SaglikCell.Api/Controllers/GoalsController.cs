using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;

namespace SaglikCell.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/goals")]
public class GoalsController : ControllerBase
{
    private readonly IGoalService _goals;
    private readonly ICurrentUser _currentUser;

    public GoalsController(IGoalService goals, ICurrentUser currentUser)
    {
        _goals = goals;
        _currentUser = currentUser;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] GoalRequest request)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _goals.CreateGoalAsync(userId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _goals.GetGoalsByUserAsync(userId);
        return Ok(result);
    }

    [HttpPatch("{goalId:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid goalId, [FromBody] UpdateGoalStatusRequest request)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _goals.UpdateGoalStatusAsync(userId, goalId, request.Status);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpDelete("{goalId:guid}")]
    public async Task<IActionResult> Delete(Guid goalId)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _goals.DeleteGoalAsync(userId, goalId);
        return result.Success ? Ok(result) : NotFound(result);
    }
}
