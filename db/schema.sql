CREATE DATABASE cryptosim;

use cryptosim;

CREATE TABLE coins
(
	id int NOT NULL,
	key_id varchar(255) NOT NULL,
	base_url varchar(255) DEFAULT 'https://www.cryptocompare.com',
	url varchar(255),
	image_url varchar(255),
	name varchar(255) NOT NULL,
	symbol varchar(255) NOT NULL,
	coin_name varchar(255) NOT NULL,
	full_name varchar(255) NOT NULL,
	sort_order int NOT NULL,
	PRIMARY KEY (id)
); 