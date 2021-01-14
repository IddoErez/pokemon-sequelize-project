USE sql_intro;
-- UPDATE company SET industry = "Tech", name = "Amazon"	
-- WHERE id = 14
-- DELETE FROM student_teacher WHERE s_id = 5

-- CREATE TABLE pokemon_type(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(25) 
-- );
-- CREATE TABLE town(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(25) 
-- );
-- CREATE TABLE trainer(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(25),
--     town INT,
--     FOREIGN KEY(town) REFERENCES town(id)
-- );
CREATE TABLE pokemon(
    id INT PRIMARY KEY,
    name VARCHAR(25),
    type INT,
    height SMALLINT,
    weight SMALLINT,
    FOREIGN KEY(type) REFERENCES pokemon_type(id)
);
-- CREATE TABLE pokemon_trainer(
-- p_id INT,
-- t_id INT,
-- FOREIGN KEY(p_id) REFERENCES pokemon(id),
-- FOREIGN KEY(t_id) REFERENCES trainer(id)
-- );
--  DROP TABLE pokemon_trainer;
--   DROP TABLE pokemon;
--   DROP TABLE pokemon_type; 
--  DROP TABLE trainer;
-- DROP TABLE town;
