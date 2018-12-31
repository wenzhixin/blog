---
title: SQL学习笔记——DDL
date: 2012-03-09 00:00:00
categories: [数据库]
tags: [SQL,DDL]
---

​1. CREATE DATABASE Syntax

  • CREATE DATABASE database\_name


​2. CREATE TABLE Syntax

  • CREATE TABLE table\_name 

    (

    column\_name1 data\_type,

    column\_name2 data\_type,

    column\_name3 data\_type,

    )


​3. SQL Constraints

  • NOT NULL - cannot insert a new record, or update a record without
adding a value to this field

  • UNIQUE - uniquely identifies each record in a table

  • PRIMARY KEY

  • FOREIGN KEY (REFERENCES) - points to a PRIMARY KEY in another table

  • CHECK - is used to limit the value range that can be placed in a
column

  • DEFAULT - is used to insert a default value into a column


​4. SQL Indexs

  (1) An index can be created in a table to find data more quickly and
efficiently

  (2) CREATE INDEX Syntax:

  • CREATE INDEX index\_name ON table\_name(column\_name)

  • CREATE UNIQUE INDEX index\_name ON table\_name(column\_name)

  (3) DROP INDEX Syntax: 

  • DROP INDEX index\_name ON table\_name


​5. DROP TABLE Syntax

  • DROP TABLE table\_name


​6. DROP DATABASE Syntax

  • DROP DATABASE database\_name


​7. TRUNCATE TABLE Syntax

  • TRUNCATE TABLE table\_name


​8. ALTER TABLE Synta

  • ALTER TABLE table\_name ADD column\_name data\_type

  • ALTER TABLE table\_name DROP column\_name

  • ALTER TABLE table\_name ALTER COLUMN column\_name data\_type


​9. SQL CREATE VIEW

  (1) a view is a virtual table based on the result-set of an SQL
statement

  (2) CREATE VIEW Syntax

  • CREATE VIEW view\_name AS SELECT column\_name(s) FROM table\_name
WHERE condition

  (3) UPDATE VIEW Syntax

  • CREATE OR REPLACE VIEW view\_name AS SELECT column\_name(s) FROM
table\_name WHERE condition

  (4) DROP VIEW Syntax

  • DROP VIEW view\_name
