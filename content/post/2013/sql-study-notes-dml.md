---
title: SQL学习笔记——DML
date: 2012-03-09
categories: [数据库]
tags: [SQL,DML]
---

​1. What is SQL

  (1) SQL stands for Structured Query Language

  (2) SQL is an ANSI standard

  (3) RDBMS(Relational Database Managerment System) is the basis for SQL
like SQLServer, DB2, Oracle, MySQL, and Access eg.


​2. SQL DML and DDL

  (1) The query and update commands from the DML(Data Manipulation
Language) part of SQL:

  • SELECT - extracts data from a database

  • UPDATE - updates data in a database

  • DELETE - deletes data from a database

  • INSERT INTO - inserts new data into a database

  (2) The most important DDL(Data Definition Language) statements in
SQL:

  • CREATE DATABASE - creates a new database

  • ALTER DATABASE - modifies a database

  • CREATE TABLE - creates a new table

  • ALTER TABLE - modifies a table

  • DROP TABLE - deletes a table

  • CREATE INDEX - creates an index

  • DROP INDEX - deletes an index


​3. SELECT Syntax and keywords

  (1) SELECT Syntax: SELECT column\_name(s) FTOM table\_name

  (2) DISTINCT: can be used to return only distinct values

  (3) WHERE: is used to filter records

  • Operators allowed in the WHERE clause: =, \<\>, \>, \<, \>=, \<=,
AND, OR, BETWEEN, LIKE, IN

  (4) ORDER BY: is used to sort the result-set

  • Keyworks for ORDER BY: ASC, DESC


​4. INSERT INTO Syntax

  • INSERT INTO table\_name VALUES(value1, value2, value3, ...) 

  • INSERT INTO table\_name(column1, column2, column3, ...)
VALUES(value1, value2, value3,...)


​5. UPDATE Syntax

  • UPDATE table\_name SET column1 = value1, column2 = value2, ... WHERE
some\_column = some\_value


​6. DELETE Syntax

  • DELETE FROM table\_name WHERE some\_column = some\_value


​7. SQL Aggregate functions and Syntax

  (1) AVG() - returns the average value

  • SELECT AVG(column\_name) FROM table\_name

  (2) COUNT() - returns the number of rows

  • SELECT COUNT(\*) FROM table\_name

  • SELECT COUNT(DISTINCT column\_name) FROM table\_name

  (3) FIRST() - returns the first value

  • SELECT FIRST(column\_name) FROM table\_name

  (4) LAST() - returns the last value

  • SELECT LAST(column\_name) FROM table\_name

  (5) MAX() - returns the largest value

  • SELECT MAX(column\_name) FROM table\_name

  (6) MIN() - returns the smallest value

  • SELECT MIN(column\_name) FROM table\_name

  (7) SUM() - return the sum

  • SELECT SUM(column\_name) FROM table\_name

  (8) GROUP BY - is used in conjunction with the aggregate functions to
group the result-set by one or more columns

  • SELECT column\_name, aggregate\_function(column\_name) FROM
table\_name WHERE column\_name operator value GROUP BY column\_name

  (9) HAVING - was added to SQL because the WHERE keyword could not be
used with aggregate functions

  • SELECT column\_name, agregate\_function(column\_name) FROM
table\_name WHERE column\_name operator value GROUP BY column\_name
HAVING aggregate\_function(column\_name) operator value


​8. SQL Scalar functions

  (1) UCASE() - converts a field to upper case

  • SELECT UCASE(column\_name) FROM table\_name

  (2) LCASE() - converts a field to lower case

  • SELECT LCASE(column\_name) FROM table\_name

  (3) MID() - extract characters from a text field

  • SELECT MID(column\_name, start[, length]) FROM table\_name

  (4) LEN() - returns the length of a text field

  • SELECT LEN(column\_name) FROM table\_name

  (5) ROUND() - rounds a numeric field to the number of decimals
specified

  • SELECT ROUND(column\_name, decimals) FROM table\_name

  (6) NOW() - returns the current system date and time

  • SELECT NOW() FROM table\_name

  (7) FORMAT() - formats how a field is to be diaplayed

  • SELECT FORMAT(column\_name, format) FROM table\_name

  (8) TOP - is used to specify the number of records to return

  • SELECT TOP number|percent column\_name(s) FROM table\_name

  (9) LIKE - is used to search for a specified pattern in a column

  • SELECT column\_name(s) FROM table\_name WHERE column\_name LIKE
pattern

  (10) IN - allows you to specify multiple values in a WHERE clause

  • SELECT column\_name(s) FROM table\_name WHERE column\_name IN
(value1, value2, ...)

  (11) BETWEEN AND - selects a range of data between two values

  • SELECT column\_name(s) FROM table\_name WHERE column\_name BETWEEN
value1 AND value2


​9. SQL Wildcard

  • % - a substitute for zero or more characters

  • \_ - a substitute for exactly one character

  • [charlist] - any single charater in charlist

  • [\^charlist] or [!charlist] - any single character not in charlist


​10. SQL Alias Syntax

  • SELECT column\_name(s) FROM table\_name AS alias\_name

  • SELECT column\_name AS alias\_name FROM table\_name


​11. SQL Joins

  • SQL joins are used to query data from two or more tables, base on a
relationship between certain columns in these tablse

  • Different SQL JOINS:

  (1) JOIN or INNER JOIN - return rows when there is at least one match
in both tables

  • SELECT column\_name(s) FROM table\_name1 INNER JOIN table\_name2 ON
table\_name1.column\_name = table\_name2.column\_name

  (2) LEFT JOIN - return all rows from the left table, even if there are
no matches in the right table

  • SELECT column\_name(s) FROM table\_name1 LEFT JOIN table\_name2 ON
table\_name1.column\_name = table\_name2.column\_name

  (3) RIGHT JOIN - return all rows from the right table, even if there
are no matches in the left table

  • SELECT column\_name(s) FROM table\_name1 RIGHT JOIN table\_name2 ON
table\_name1.column\_name = table\_name2.column\_name

  (4) FULL JOIN - return rows when there is a match in one of the tables

  • SELECT column\_name(s) FROM table\_name1 FULL JOIN table\_name2 ON
table\_name1.column\_name = table\_name2.column\_name


​12. SQL UNION Operator

  (1) UNION operator is used to combine the result-set of two or more
SELECT statements

  (2) Syntax

  • SELECT column\_name(s) FROM table\_name1 UNION SELECT
column\_name(s) FROM table\_name2

  • SELECT column\_name(s) FROM table\_name1 UNION ALL SELECT
column\_name(s) FROM table\_name2


​13. SQL SELECT INTO Statement

  (1) SELECT INTO statement can be used to create backup copies of
tables

  (2) Syntax:

  • SELECT \* INTO new\_table\_name [IN externaldatabase] FROM
old\_tablename

  • SELECT column\_name(s) INTO new\_table\_name [IN externaldatabase]
FROM old\_tablename
