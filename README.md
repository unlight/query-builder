Query Builder
=============
Builds sql query for RDBMS.

INSTALL
-------
```
npm i -S @iamthes/query-builder
```

USAGE
-----
```js
const queryBuilder = require("@iamthes/query-builder");
const q = queryBuilder.create("mysql");
var sql = q()
	.select("*")
	.from("user")
	.where("id", 5)
	.get(); // select * from user where id = 5
```
```js
const queryBuilder = require("@iamthes/query-builder");
const Builder = queryBuilder.mysql;
const b = new Builder();
var sql = b
    .select("count", "*", "total")
    .from("user")
    .get(); // select count(*) as total from user

// Using same instance to build next query.
sql = b
    .select("job, salary")
    .from("user")
    .where("salary", "@null")
    .get(); // select job, salary from user where salary = null
```
Check `test` directory for more examples.

CHANGELOG
---------
* 0.0.6 (15 Aug 2016) export definition files, more typings
* 0.0.3 (26 Jul 2016) where can accept 3 parameters
* 0.0.2 (24 Jul 2016) second release
* 0.0.1 (23 Jul 2016) first release