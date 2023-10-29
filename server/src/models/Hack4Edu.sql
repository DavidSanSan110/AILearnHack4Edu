CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.course_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.section_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.lesson_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.exercise_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.answer_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.enrollment_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.progress_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer PRIMARY KEY DEFAULT nextval('user_id_seq'::regclass),
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    register_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role character varying(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.course
(
    id integer PRIMARY KEY DEFAULT nextval('course_id_seq'::regclass),
    subject character varying(50) NOT NULL,
    difficulty character varying(50) NOT NULL,
    code character varying(100),
    isGenerated boolean NOT NULL DEFAULT false,
    issv boolean NOT NULL DEFAULT false,
);

CREATE TABLE IF NOT EXISTS public.section
(
    id integer PRIMARY KEY DEFAULT nextval('section_id_seq'::regclass),
    course_id integer NOT NULL,
    title character varying(50) NOT NULL,
    text character varying(50) NOT NULL,
    CONSTRAINT course_id_fkey_sections FOREIGN KEY (course_id)
        REFERENCES public.course (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.lesson
(
    id integer PRIMARY KEY DEFAULT nextval('lesson_id_seq'::regclass),
    section_id integer NOT NULL,
    title character varying(50) NOT NULL,
    text character varying(50) NOT NULL,
    CONSTRAINT section_id_fkey_lessons FOREIGN KEY (section_id)
        REFERENCES public.section (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.exercise
(
    id integer PRIMARY KEY DEFAULT nextval('exercise_id_seq'::regclass),
    lesson_id integer NOT NULL,
    type character varying(50) NOT NULL,
    question character varying(50) NOT NULL,
    explanation character varying(50) NOT NULL,
    options character varying(50),
    correct_option character varying(50),
    CONSTRAINT lesson_id_fkey_exercises FOREIGN KEY (lesson_id)
        REFERENCES public.lesson (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.answer
(
    id integer PRIMARY KEY DEFAULT nextval('answer_id_seq'::regclass),
    exercise_id integer NOT NULL,
    user_id integer NOT NULL,
    answer character varying(50) NOT NULL,
    isCorrect boolean NOT NULL DEFAULT false,
    feedback character varying(50),
    date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT exercise_id_fkey_answers FOREIGN KEY (exercise_id)
        REFERENCES public.exercise (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_id_fkey_answers FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.enrollment
(
    id integer PRIMARY KEY DEFAULT nextval('enrollment_id_seq'::regclass),
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_id_fkey_enrollments FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT course_id_fkey_enrollments FOREIGN KEY (course_id)
        REFERENCES public.course (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.progress
(
    id integer PRIMARY KEY DEFAULT nextval('progress_id_seq'::regclass),
    user_id integer NOT NULL,
    lesson_id integer NOT NULL,
    CONSTRAINT user_id_fkey_progress FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT lesson_id_fkey_progress FOREIGN KEY (lesson_id)
        REFERENCES public.lesson (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.task
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    course_id integer NOT NULL,
    created_at time without time zone NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    url character varying COLLATE pg_catalog."default" NOT NULL,
    method character varying COLLATE pg_catalog."default" NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'pending'::character varying,
    params jsonb,
    result jsonb,
    CONSTRAINT task_pkey PRIMARY KEY (id)
)


