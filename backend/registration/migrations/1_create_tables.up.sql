CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  parent_name VARCHAR(255) NOT NULL,
  child_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  child_age INTEGER,
  grade VARCHAR(50),
  package_type VARCHAR(50),
  registration_type VARCHAR(50) NOT NULL DEFAULT 'trial',
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  parent_name VARCHAR(255) NOT NULL,
  child_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  child_age INTEGER,
  grade VARCHAR(50),
  consultation_type VARCHAR(100) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(20) NOT NULL,
  topics TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_date ON consultations(preferred_date);
