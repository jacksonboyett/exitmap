create table users (
	_id int generated always as identity primary key not null,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255) not null unique, /* need to improve later - doesn't protect against case insensivity*/
	password varchar(255) not null
);