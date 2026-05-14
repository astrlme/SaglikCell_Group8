using DotNetEnv;
using SaglikCell.Api.Auth;
using SaglikCell.Api.Extensions;
using SaglikCell.Api.Middleware;
using SaglikCell.Application;
using SaglikCell.Application.Interfaces;
using SaglikCell.Infrastructure;

// ── Bootstrap ───────────────────────────────────────────────────────────────────
// Load .env from the nearest parent directory (repo root) so env vars are
// available before configuration is built.  ASP.NET Core's
// AddEnvironmentVariables() will then surface them as overrides for
// appsettings.json (Jwt__Key, ConnectionStrings__*, …).
Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

// ── DI – Application & Infrastructure layers ────────────────────────────────────
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// ── DI – API layer ──────────────────────────────────────────────────────────────
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();
builder.Services.AddControllers();

builder.Services.AddSaglikCellAuthentication(builder.Configuration);
builder.Services.AddSaglikCellSwagger();
builder.Services.AddSaglikCellCors(builder.Configuration);

var app = builder.Build();

// ── Middleware pipeline ─────────────────────────────────────────────────────────
app.UseMiddleware<ExceptionHandlingMiddleware>();

// API docs – Swagger JSON + Scalar UI (all environments)
app.MapSaglikCellApiDocs();

app.UseCors(CorsExtensions.PolicyName);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();