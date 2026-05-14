CREATE INDEX idx_health_metrics_user_type_date
ON health_metrics(user_id, metric_type, recorded_date);

CREATE INDEX idx_goals_user_status
ON goals(user_id, status);

CREATE INDEX idx_notifications_user_read
ON notifications(user_id, is_read);