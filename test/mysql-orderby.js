import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test("order by 1", t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .orderBy("id")
        .get();
    t.is(sql, 'select * from user order by id asc');
});

test("order by 2", t => {
    var sql = sqldriver
        .select("id, name")
        .from("user")
        .orderBy("id", "desc")
        .get();
    t.is(sql, 'select id, name from user order by id desc');
});

test("order by 3", t => {
    var sql = sqldriver
        .select("id as user_id")
        .select("name as user_name")
        .from("user")
        .orderBy("id", "asc")
        .get();
    t.is(sql, 'select id as user_id, name as user_name from user order by id asc');
});

test("several order by", t => {
    var sql = sqldriver
        .select()
        .from("user")
        .orderBy("name", "asc")
        .orderBy("id", "desc")
        .get();
    t.is(sql, 'select * from user order by name asc, id desc');
});