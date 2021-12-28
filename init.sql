CREATE TABLE envelopes(
  id SERIAL PRIMARY KEY,
  title varchar(20),
  budget money
);

INSERT INTO envelopes(title,budget) VALUES('books',500);