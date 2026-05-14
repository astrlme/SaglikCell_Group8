using System.Net;
using System.Text.Json;
using SaglikCell.Domain.DTOs;

namespace SaglikCell.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private readonly IHostEnvironment _env;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception while processing {Path}", context.Request.Path);
            await WriteProblemAsync(context, ex);
        }
    }

    private async Task WriteProblemAsync(HttpContext context, Exception ex)
    {
        var (status, message) = ex switch
        {
            SaglikCell.Application.Exceptions.ConflictException => (HttpStatusCode.Conflict, ex.Message),
            SaglikCell.Application.Exceptions.NotFoundException => (HttpStatusCode.NotFound, ex.Message),
            SaglikCell.Application.Exceptions.ValidationException => (HttpStatusCode.BadRequest, ex.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Yetkisiz erişim."),
            KeyNotFoundException => (HttpStatusCode.NotFound, ex.Message),
            ArgumentException => (HttpStatusCode.BadRequest, ex.Message),
            InvalidOperationException => (HttpStatusCode.BadRequest, ex.Message),
            _ => (HttpStatusCode.InternalServerError, "Beklenmeyen bir hata oluştu."),
        };

        var errors = _env.IsDevelopment()
            ? new List<string> { ex.GetType().Name, ex.ToString() }
            : null;

        var body = ApiResponse<object>.Fail(message, errors);

        context.Response.Clear();
        context.Response.StatusCode = (int)status;
        context.Response.ContentType = "application/json; charset=utf-8";
        await context.Response.WriteAsync(JsonSerializer.Serialize(body, JsonOptions));
    }
}
