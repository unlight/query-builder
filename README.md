# Query Builder
Builds sql query for RDBMS

## INSTALL
```
npm i -S query-builder
```

## USAGE
```js
const  b = require("query-builder");
var sql = sqldriver
	.select("*")
	.from("user")
	.where("id", 5)
	.get(); // select * from user where id = 5
```
Check `test` directory for more examples.
