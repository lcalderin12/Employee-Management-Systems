/*mysql -u root -p <seeds.sql*/
use employee_db;

/*department table*/
insert into department (name) 
values ("Administrations");
insert into department (name) 
values("Sales");
insert into department (name) 
values("Research");
insert into department (name) 
values("Student");

/*role table*/
insert into role (title, salary, department_id)
values("Manager", 200000, 1);
insert into role (title, salary, department_id)
values("Marketing", 90000, 2);
insert into role (title, salary, department_id)
values("Engineer", 150000, 3);
insert into role (title, salary, department_id)
values("Intern", 0, 4);

/*employee table */
insert into employee (first_name, last_name, role_id, manager_id)
values ("Luis","Calderin", 1, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Mike","Gotkin", 2, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Brian", "Tardiff", 3, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("John", "Doe",4, 1);
