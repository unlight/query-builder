import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test("general between query", t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .between("id", 3, 6)
        .get();

    t.is(sql, "select * from user where id between 3 and 6");
});

test("between double dot expr", t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .between("id", "3..6")
        .get();

    t.is(sql, 'select * from user where id between 3 and 6');
});