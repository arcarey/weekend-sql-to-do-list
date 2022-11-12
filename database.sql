CREATE TABLE tasks (
	"id" serial primary key,
	"text" varchar(255) not null,
	"complete" BOOLEAN DEFAULT false
);

INSERT INTO tasks (
	"text", "complete")
VALUES ('grocery shop', 'F'),
('laundry', 'F'),
('finish weekend project', 'F');