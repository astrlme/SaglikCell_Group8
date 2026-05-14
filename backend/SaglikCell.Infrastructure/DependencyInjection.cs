using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using SaglikCell.Application.Interfaces;
using SaglikCell.Domain.Enums;
using SaglikCell.Infrastructure.Auth;
using SaglikCell.Infrastructure.Data;

namespace SaglikCell.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");

        services.AddDbContext<AppDbContext>(options => 
            options.UseNpgsql(connectionString, o =>
            {
                var translator = new Npgsql.NameTranslation.NpgsqlNullNameTranslator();
                o.MapEnum<UserRole>("user_role", nameTranslator: translator);
                o.MapEnum<GenderType>("gender_type", nameTranslator: translator);
                o.MapEnum<MetricType>("metric_type", nameTranslator: translator);
                o.MapEnum<GoalPeriod>("goal_period", nameTranslator: translator);
                o.MapEnum<GoalStatus>("goal_status", nameTranslator: translator);
                o.MapEnum<SubscriptionStatus>("subscription_status", nameTranslator: translator);
                o.MapEnum<NotificationType>("notification_type", nameTranslator: translator);
            })
            .UseSnakeCaseNamingConvention());
        
        services.AddScoped<IAppDbContext>(sp => sp.GetRequiredService<AppDbContext>());

        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton<IJwtTokenService, JwtTokenService>();
        services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
        services.AddSingleton<IOtpService, InMemoryOtpService>();

        return services;
    }
}
