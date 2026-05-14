using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.DTOs;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/metrics")]
public class MetricsController : ControllerBase
{
    private readonly IMetricService _metrics;
    private readonly ICurrentUser _currentUser;

    public MetricsController(IMetricService metrics, ICurrentUser currentUser)
    {
        _metrics = metrics;
        _currentUser = currentUser;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] MetricRequest request)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _metrics.AddMetricAsync(userId, request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] MetricType? type)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = type is null
            ? await _metrics.GetMetricsByUserAsync(userId)
            : await _metrics.GetMetricsByTypeAsync(userId, type.Value);
        return Ok(result);
    }

    [HttpDelete("{metricId:guid}")]
    public async Task<IActionResult> Delete(Guid metricId)
    {
        if (_currentUser.UserId is not { } userId) return Unauthorized();
        var result = await _metrics.DeleteMetricAsync(userId, metricId);
        return result.Success ? Ok(result) : NotFound(result);
    }
}
