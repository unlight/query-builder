import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general between query", t => {
    var sql = q()
        .select("*")
        .from("user")
        .between("id", 3, 6)
        .get();

    t.is(sql, "select * from user where id between 3 and 6");
});

test("between double dot expr", t => {
    var sql = q()
        .select("*")
        .from("user")
        .between("id", "3..6")
        .get();

    t.is(sql, 'select * from user where id between 3 and 6');
});