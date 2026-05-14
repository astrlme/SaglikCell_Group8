CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM (
    'FREE',
    'PREMIUM',
    'ADMIN'
);

CREATE TYPE gender_type AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);

CREATE TYPE metric_type AS ENUM (
    'STEPS',
    'WATER',
    'SLEEP',
    'WEIGHT',
    'HEART_RATE',
    'CALORIES'
);

CREATE TYPE goal_period AS ENUM (
    'DAILY',
    'WEEKLY',
    'MONTHLY'
);

CREATE TYPE goal_status AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'PAUSED'
);

CREATE TYPE notification_type AS ENUM (
    'WATER_REMINDER',
    'DAILY_ENTRY_REMINDER',
    'GOAL_PROGRESS'
);

CREATE TYPE subscription_status AS ENUM (
    'ACTIVE',
    'CANCELLED',
    'FAILED'
);

