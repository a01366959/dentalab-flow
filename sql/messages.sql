### SQL Script for Supabase

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO messages (subject, content) VALUES
('Order #001', 'Please provide an update on order #001.'),
('Support Request', 'I need help with my account.'),
('Order #002', 'Can I change the due date for order #002?');
