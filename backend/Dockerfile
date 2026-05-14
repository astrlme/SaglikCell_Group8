# ── Build stage ──────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution + csproj files first for layer-cached restore
COPY SaglikCellBackend.slnx ./
COPY SaglikCell.Domain/SaglikCell.Domain.csproj          SaglikCell.Domain/
COPY SaglikCell.Application/SaglikCell.Application.csproj SaglikCell.Application/
COPY SaglikCell.Infrastructure/SaglikCell.Infrastructure.csproj SaglikCell.Infrastructure/
COPY SaglikCell.Api/SaglikCell.Api.csproj                SaglikCell.Api/

RUN dotnet restore

# Copy the rest of the source and publish
COPY . .
RUN dotnet publish SaglikCell.Api/SaglikCell.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# ── Runtime stage ────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# ASP.NET Core listens on 8080 by default in .NET 8+
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "SaglikCell.Api.dll"]
