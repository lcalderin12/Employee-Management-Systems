drop database employee_db;
create database employee_db;

use management_db;

create table department(
	id int not null auto_increment,
    name varchar(30),
    PRIMARY KEY(id)
);

create table role(
	id int not null auto_increment,
    title varchar(30),
    salary decimal(10,2),
    department_id int,
    PRIMARY KEY(id)
);

create table employee(
	id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    PRIMARY KEY(id)
);
