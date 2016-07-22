import test from "ava";
import lib from "..";
const q = lib.create("sqlite");

test("limit offset", t => {
    var sql = q()
        .select("u.name")
        .from("user u")
        .limit(10)
        .offset(5)
        .get();
    t.is(sql, 'select u.name from user u limit 10 offset 5');
});