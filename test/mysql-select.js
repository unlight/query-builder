import test from "ava";
import m from "..";
const sqldriver = m.bind(null, "mysql");

test("simple select", t => {
    var sql = sqldriver()
        .select()
        .from("user")
        .where("id", 1)
        .get();
    t.is(sql, "select * from user where id = 1")
});

test("select 1", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .beginWhereGroup()
        .where("id <", 12)
        .orOp()
        .where("id >", 19)
        .endWhereGroup()
        .andOp()
        .where("job_id", 5)
        .get();

    t.is(sql, 'select * from user where (id < 12 or id > 19) and job_id = 5');
});

test("with or op", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .where("id", 3)
        .orOp()
        .where("id", 5)
        .get();
    t.is(sql, 'select * from user where id = 3 or id = 5');
});

test("func concat", t => {
    var sql = sqldriver()
        .select("concat", ["id", "name"], "x")
        .from("user")
        .get();
    t.is(sql, "select concat(id, name) as x from user");
});

test("with where in", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .whereIn("id", [2, '3'])
        .get();

    t.is(sql, "select * from user where id in (2,3)");
});

test("misc selects a", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .get();

    t.is(sql, "select * from user");

    sql = sqldriver()
        .select("id, name")
        .from("user")
        .get();

    t.is(sql, "select id, name from user");

    sql = sqldriver()
        .select("id as user_id")
        .select("name as user_name")
        .from("user")
        .get();

    t.is(sql, "select id as user_id, name as user_name from user");

    sql = sqldriver()
        .select(["u.id", "u.name"])
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver()
        .select("u.id, u.name")
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver()
        .select("id")
        .select("length", "name", "size")
        .from("user")
        .get();

    t.is(sql, "select id, length(name) as size from user");

    sql = sqldriver()
        .select("concat", ["id", "name"], "concatenatedA")
        .from("user")
        .get();

    t.is(sql, "select concat(id, name) as concatenatedA from user");

    sql = sqldriver()
        .select("1 + 1", "sum")
        .get();

    t.is(sql, "select 1 + 1 as sum");

    sql = sqldriver()
        .select("concat", "a, b, c", "concatenatedB")
        .get();

    t.is(sql, "select concat(a, b, c) as concatenatedB");
});

test("misc selects b", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .get();
    t.is(sql, "select * from user");

    var sql = sqldriver()
        .select("id, name")
        .from("user")
        .get();
    t.is(sql, "select id, name from user");

    sql = sqldriver()
        .select("id as user_id")
        .select("name as user_name")
        .from("user")
        .get();

    t.is(sql, "select id as user_id, name as user_name from user");

    sql = sqldriver()
        .select(["u.id", "u.name"])
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver()
        .select("u.id, u.name")
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver()
        .select("id")
        .select("name", "length", "size")
        .from("user")
        .get();

    t.is(sql, "select id, name(length) as size from user");

    sql = sqldriver()
        .select("1 + 1", "sum")
        .get();

    t.is(sql, "select 1 + 1 as sum");

    sql = sqldriver()
        .select("concat", "a, b, c", "alias")
        .get();

    t.is(sql, "select concat(a, b, c) as alias");
});

test("with where in string", t => {
    var sql;
    sql = sqldriver()
        .select("*")
        .from("user")
        .whereIn("name", ["Joe", 'Mary'])
        .get();

    t.is(sql, "select * from user where name in ('Joe','Mary')");
});

test("with where not in", t => {
    var sql = sqldriver()
        .select("*")
        .from("user")
        .whereNotIn("name", ["Joe", 'Mary'])
        .get();
    t.is(sql, "select * from user where name not in (\'Joe\',\'Mary\')");
});

test("count", t => {
    var sql;
    sql = sqldriver()
        .select("count", "*", "")
        .from("user")
        .get();

    t.is(sql, 'select count(*) from user');
});

test("misc functions", function (t) {
    var sql = sqldriver()
        .select("count", "*", "row_count")
        .from("user")
        .get();
    t.is(sql, 'select count(*) as row_count from user');

    var sql = sqldriver()
        .select("concat", "id, name", "concat_alias")
        .from("user")
        .get();
    t.is(sql, 'select concat(id, name) as concat_alias from user');

    var sql = sqldriver()
        .select("max", "id", "")
        .from("user")
        .get();
    t.is(sql, 'select max(id) from user');
});

test("where is null", function (t) {
    var sql;
    sql = sqldriver()
        .select("job, salary")
        .from("user")
        .where("salary is null")
        .get();
    t.is(sql, 'select job, salary from user where salary is null');
    sql = sqldriver()
        .select("job, salary")
        .from("user")
        .where("salary", "@null")
        .get();
    t.is(sql, 'select job, salary from user where salary = null');
});

test("misc selects c", function (t) {
    var sql;

    sql = sqldriver()
        .select()
        .from("user")
        .where("id", 5)
        .get();
    t.is(sql, "select * from user where id = 5");

    sql = sqldriver()
        .select()
        .from("user")
        .where("id >", 5)
        .get();
    t.is(sql, "select * from user where id > 5");

    sql = sqldriver()
        .select()
        .from("user")
        .where("id !=", 5)
        .get();
    t.is(sql, "select * from user where id != 5");

    sql = sqldriver()
        .select()
        .from("user")
        .where("name", "Jane")
        .get();
    t.is(sql, "select * from user where name = 'Jane'");

    sql = sqldriver()
        .select("user.*")
        .from("user")
        .where("name is null")
        .get();
    t.is(sql, "select user.* from user where name is null");

    sql = sqldriver()
        .select("user.*")
        .from("user")
        .where({
            name: "Jane",
            "id >": 2
        })
        .get();
    t.is(sql, "select user.* from user where name = 'Jane' and id > 2");

    sql = sqldriver()
        .select("user.*")
        .from("user")
        .where({
            name: "Ivan",
            "id <": 8
        })
        .where("position_id", 3)
        .get();
    t.is(sql, "select user.* from user where name = 'Ivan' and id < 8 and position_id = 3");

    sql = sqldriver()
        .select("user.*")
        .from("user")
        .limit(5)
        .get();
    t.is(sql, "select user.* from user limit 5");

    sql = sqldriver()
        .select("user.*")
        .from("user")
        .limit(5, 2)
        .get();
    t.is(sql, "select user.* from user limit 5 offset 2");

});


