insert into
	users(first_name, last_name, email, password)
values
	('luke', 'luke', 'luke@luke.luke', 'luke'),
	('John', 'Doe', 'JohnDoe@gmail.com', 'password'),
	('Jane', 'Doe', 'JaneDoe@gmail.com', 'password'),
	(
		'Booby',
		'Tuesday',
		'boobs@gmail.com',
		'ilikeboobies'
	),
	(null, null, 'null@gmail.com', 'nullpassword');

insert into
	exits(
		name,
		description,
		type,
		heightImpact,
		heightLanding,
		lat,
		long,
		city,
		state,
		country,
		image,
		legal
	)
values
	(
		'Perrine Bridge',
		'This is easily the most jumped object in the United States. It is the only man-made legal object in the U.S. that can be jumped year-round. Jumpers from all over the world come to jump this object. It is the perfect object for beginners to learn to BASE jump.',
		'Span',
		486,
		486,
		42.600840,
		-114.453515,
		'Twin Falls',
		'Idaho',
		'United States',
		'https://visitsouthidaho.com/content/uploads/2019/06/Miles.jpg',
		'1'
	),
	(
		'Tombstone',
		'This is the classic jump in Moab. For many people, it the first cliff that they jump. A beautiful cliff face that looks just like a Tombstone, when you jump this exit, you hope its name is not any kind of foreshadowing.',
		'Earth',
		515,
		550,
		38.52926,
		-109.593778,
		'Moab',
		'Utah',
		'United States',
		'https://www.verticalperceptions.com/img-get2/I0000tS5KXmDnMiE/fit=1000x750/DSC-0289.jpg',
		'1'
	),
	(
		'Der Rotenfels',
		'A surprisingly fun object to jump. The Der Rotenfels are climbed by climbers frequently, so be sure to check that there are no climbers beneath you when you jump. There are people frequently at this exit point, so please be cautious.',
		'Earth',
		550,
		600,
		49.8173328,
		7.8311917,
		'Bad Kreuznach',
		'Rhineland-Pfalz',
		'Germany',
		'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Rotenfels_bei_Bad_M%C3%BCnster_am_Stein_Ebernburg.JPG/800px-Rotenfels_bei_Bad_M%C3%BCnster_am_Stein_Ebernburg.JPG',
		'1'
	),
	(
		'El Capitan',
		'The original BASE jumping object. The first BASE jumps ever where made here with Carl Boenish and his team. Sitting in the beautiful Yosemite Valley, this is one of the most iconic jumps in the world.',
		'Earth',
		1000,
		3200,
		37.730416,
		-119.635928,
		'Yosemite',
		'California',
		'United States',
		'https://www.hcn.org/issues/47.12/deaths-renew-calls-for-national-parks-to-rescind-base-jumping-bans/basejumping-jpg/image',
		'1'
	),
	(
		'Forrest Hill Bridge',
		'This is like the Perrine, but higher and more illegal. This bridge has been jumped for decades and burned many times. Watch out for the local bridge BASE troll, they have a tendancy to hang around. Also watch for the Rangers.',
		'Span',
		730,
		680,
		38.9224,
		-121.0387,
		'Auburn',
		'California',
		'United States',
		'https://i.ytimg.com/vi/EhWDtnq7PNw/maxresdefault.jpg',
		'0'
	),
	(
		'Icon Apartments',
		'This is a fun but sketchy building jump in Buckhead. Only jump this object in the early morning when people are not awake. Access to the building can most likely be got through the parking deck. Land on the parking deck adjacent to the building.', 		
		'Building',
		419,
		370,
		33.8489,
		-84.3672,
		'Atlanta',
		'Georgia',
		'United States',
		'https://image1.apartmentfinder.com/i2/FNfKeTxDHdwNA-oJbtp0hD_S5q3VxjnI8hllR_f7USg/111/icon-buckhead-atlanta-ga-highway-access.jpg',
		'0'
	);