using System.ComponentModel.DataAnnotations;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.DTOs;

public class MetricRequest
{
    [Required(ErrorMessage = "Metrik tipi zorunludur.")]
    public MetricType MetricType { get; set; }

    [Required(ErrorMessage = "Değer zorunludur.")]
    [Range(0, 100000, ErrorMessage = "Değer 0 ile 100000 arasında olmalıdır.")]
    public decimal Value { get; set; }

    [Required(ErrorMessage = "Tarih zorunludur.")]
    public DateOnly RecordedDate { get; set; }
}

public class MetricResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public MetricType MetricType { get; set; }
    public decimal Value { get; set; }
    public DateOnly RecordedDate { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
