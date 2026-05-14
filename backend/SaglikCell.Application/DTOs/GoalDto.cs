using System.ComponentModel.DataAnnotations;
using SaglikCell.Domain.Enums;

namespace SaglikCell.Domain.DTOs;

public class GoalRequest
{
    [Required(ErrorMessage = "Metrik tipi zorunludur.")]
    public MetricType MetricType { get; set; }

    [Required(ErrorMessage = "Hedef değer zorunludur.")]
    [Range(0, 100000, ErrorMessage = "Hedef değer 0 ile 100000 arasında olmalıdır.")]
    public decimal TargetValue { get; set; }

    [Required(ErrorMessage = "Periyot zorunludur.")]
    public GoalPeriod Period { get; set; }
}

public class GoalResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public MetricType MetricType { get; set; }
    public decimal TargetValue { get; set; }
    public GoalPeriod Period { get; set; }
    public int CurrentStreak { get; set; }
    public GoalStatus Status { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
