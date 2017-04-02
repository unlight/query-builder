# Query Builder

[![Greenkeeper badge](https://badges.greenkeeper.io/unlight/query-builder.svg)](https://greenkeeper.io/)
Builds sql query for RDBMS.

## INSTALL
```
npm i -S @iamthes/query-builder
```

## USAGE
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