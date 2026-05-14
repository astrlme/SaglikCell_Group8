var builder = WebApplication.CreateBuilder(args);

// 1. Controller'ları sisteme ekliyoruz ve mevcut projedeki sınıfları zorla taratıyoruz
builder.Services.AddControllers()
    .AddApplicationPart(typeof(Program).Assembly); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. CORS ayarlarını frontend'in rahatça bağlanabilmesi için yapıyoruz
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. Geliştirme aşamasında Swagger her zaman çalışsın
app.UseSwagger();
app.UseSwaggerUI();

// 4. CORS politikasını MapControllers'dan önce çağırıyoruz
app.UseCors("AllowFrontend");

// 5. Yönlendirmeleri aktif ediyoruz
app.MapControllers();

app.Run();