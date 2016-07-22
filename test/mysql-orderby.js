import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("order by 1", t => {
    var sql = q()
        .select("*")
        .from("user")
        .orderBy("id")
        .get();
    t.is(sql, 'select * from user order by id asc');
});

test("order by 2", t => {
    var sql = q()
        .select("id, name")
        .from("user")
        .orderBy("id", "desc")
        .get();
    t.is(sql, 'select id, name from user order by id desc');
});

test("order by 3", t => {
    var sql = q()
        .select("id as user_id")
        .select("name as user_name")
        .from("user")
        .orderBy("id", "asc")
        .get();
    t.is(sql, 'select id as user_id, name as user_name from user order by id asc');
});

test("several order by", t => {
    var sql = q()
        .select()
        .from("user")
        .orderBy("name", "asc")
        .orderBy("id", "desc")
        .get();
    t.is(sql, 'select * from user order by name asc, id desc');
});

test("general group by", t => {
    var sql = q()
        .select("*")
        .from("user")
        .groupBy("name")
        .get();
    t.is(sql, "select * from user group by name");
});

test("having case", t => {
    var sql = q()
        .select("count", "name", "count_name")
        .from("user")
        .having("count_name >", 1)
        .get();
    t.is(sql, "select count(name) as count_name from user having count_name > 1");
});