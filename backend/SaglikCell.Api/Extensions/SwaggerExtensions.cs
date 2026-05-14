using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;

namespace SaglikCell.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSaglikCellSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "SaglikCell API",
                Version = "v1",
                Description = "Turkcell CodeNight 2026 — SağlıkCell health tracking API.",
                Contact = new OpenApiContact
                {
                    Name = "SağlıkCell Team",
                },
            });

            // JWT Bearer authentication for the lock icon in docs
            var bearer = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Paste 'Bearer {token}' or just '{token}'.",
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
            };

            c.AddSecurityDefinition("Bearer", bearer);
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { bearer, Array.Empty<string>() },
            });
        });

        return services;
    }

    /// <summary>
    /// Maps Swagger JSON endpoint + Scalar interactive API reference UI.
    /// </summary>
    public static WebApplication MapSaglikCellApiDocs(this WebApplication app)
    {
        app.UseSwagger(c =>
        {
            // Scalar reads the OpenAPI spec from this route
            c.RouteTemplate = "openapi/{documentName}.json";
        });

        app.MapScalarApiReference(options =>
        {
            options
                .WithTitle("SaglikCell API Reference")
                .WithTheme(ScalarTheme.Kepler)
                .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
        });

        return app;
    }
}
