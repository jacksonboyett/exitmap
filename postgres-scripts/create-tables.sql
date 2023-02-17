create table users (
	_id int generated always as identity primary key not null,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255) not null unique, /* need to improve later - doesn't protect against case insensivity*/
	password varchar(255) not null
);

create table exits (
	_id int generated always as identity primary key not null,
	name varchar(255),
	description varchar(2000),
	type varchar(255),
	heightImpact int, 
	heightLanding int, 
	lat real,
	long real,
	city varchar(255),
	state varchar(255),
	country varchar(255),
	image varchar(500),
	legal boolean
);

create table comments (
	_id int generated always as identity primary key not null,
	text varchar(5000) not null,
	user_id int not null references users (_id) on delete restrict on update restrict,
	exit_id int not null references exits (_id) on delete restrict on update restrict,
	created_at timestamptz(0) not null default now()
);