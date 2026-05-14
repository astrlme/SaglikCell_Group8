CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gsm VARCHAR(20) UNIQUE NOT NULL,
    password_hash TEXT,
    role user_role NOT NULL DEFAULT 'FREE',
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    gender gender_type,
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    chronic_condition TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE health_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric_type metric_type NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    recorded_date DATE NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT check_metric_value CHECK (
        (metric_type = 'STEPS' AND value BETWEEN 0 AND 100000) OR
        (metric_type = 'WATER' AND value BETWEEN 0 AND 10000) OR
        (metric_type = 'SLEEP' AND value BETWEEN 0 AND 24) OR
        (metric_type = 'WEIGHT' AND value BETWEEN 20 AND 300) OR
        (metric_type = 'HEART_RATE' AND value BETWEEN 30 AND 250) OR
        (metric_type = 'CALORIES' AND value BETWEEN 0 AND 10000)
    )
);

CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    metric_type metric_type NOT NULL,
    target_value DECIMAL(10,2) NOT NULL,
    period goal_period NOT NULL,
    current_streak INTEGER NOT NULL DEFAULT 0,
    status goal_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL DEFAULT 'PAYCELL',
    card_number_masked VARCHAR(30),
    status subscription_status NOT NULL,
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);