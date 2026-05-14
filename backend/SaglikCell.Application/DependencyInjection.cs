using Microsoft.Extensions.DependencyInjection;
using SaglikCell.Application.Interfaces;
using SaglikCell.Application.Services;

namespace SaglikCell.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<IMetricService, MetricService>();
        services.AddScoped<IGoalService, GoalService>();

        return services;
    }
}
