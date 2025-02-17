CREATE TABLE learning_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO learning_content (title, description) VALUES
('Introduction to Dental Procedures', 'Learn about various dental procedures.'),
('Advanced Implant Techniques', 'Detailed guide on advanced implant techniques.'),
('Patient Management', 'Best practices for managing patient information.');
