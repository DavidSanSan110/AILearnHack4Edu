DELETE FROM enrollment;
DELETE FROM progress;
DELETE FROM answer;
DELETE FROM exercise;
DELETE FROM lesson;
DELETE FROM section;
DELETE FROM course;

DROP TABLE enrollment;
DROP TABLE progress;
DROP TABLE answer;
DROP TABLE exercise;
DROP TABLE lesson;
DROP TABLE section;
DROP TABLE course;
DROP TABLE user;
DROP TABLE task;

DROP SEQUENCE IF EXISTS user_id_seq;
DROP SEQUENCE IF EXISTS course_id_seq;
DROP SEQUENCE IF EXISTS section_id_seq;
DROP SEQUENCE IF EXISTS lesson_id_seq;
DROP SEQUENCE IF EXISTS exercise_id_seq;
DROP SEQUENCE IF EXISTS answer_id_seq;
DROP SEQUENCE IF EXISTS enrollment_id_seq;
DROP SEQUENCE IF EXISTS progress_id_seq;


