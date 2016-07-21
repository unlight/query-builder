import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test(t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .where("id", 3)
        .orOp()
        .where("id", 5)
        .get();
    t.is(sql, 'select * from user where id = 3 or id = 5');
});

test(t => {
    var sql = sqldriver
        .select("concat", ["id", "name"], "x")
        .from("user")
        .get();
    t.is(sql, "select concat(id, name) as x from user");
});

test(t => {
    var sql;

    sql = sqldriver
        .select("*")
        .from("user")
        .get();

    t.is(sql, "select * from user");

    sql = sqldriver
        .select("id, name")
        .from("user")
        .get();

    t.is(sql, "select id, name from user");

    sql = sqldriver
        .select("id as user_id")
        .select("name as user_name")
        .from("user")
        .get();

    t.is(sql, "select id as user_id, name as user_name from user");

    sql = sqldriver
        .select(["u.id", "u.name"])
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver
        .select("u.id, u.name")
        .from("user u")
        .get();

    t.is(sql, "select u.id, u.name from user u");

    sql = sqldriver
        .select("id")
        .select("length", "name", "size")
        .from("user")
        .get();

    t.is(sql, "select id, length(name) as size from user");

    sql = sqldriver
        .select("concat", ["id", "name"], "concatenatedA")
        .from("user")
        .get();

    t.is(sql, "select concat(id, name) as concatenatedA from user");

    sql = sqldriver
        .select("1 + 1", "sum")
        .get();

    t.is(sql, "select 1 + 1 as sum");

    sql = sqldriver
        .select("concat", "a, b, c", "concatenatedB")
        .get();

    t.is(sql, "select concat(a, b, c) as concatenatedB");
});