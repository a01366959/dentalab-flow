CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (id, username, email, password)
VALUES
  ('uuid_generate_v4()', 'user1', 'user1@example.com', 'password1'),
  ('uuid_generate_v4()', 'user2', 'user2@example.com', 'password2');
