import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test("general group by", t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .groupBy("name")
        .get();
    t.is(sql, "select * from user group by name");
});
