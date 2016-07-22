import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test("general case", t => {
    var sql = sqldriver
        .select("count", "name", "count_name")
        .from("user")
        .having("count_name >", 1)
        .get();
    t.is(sql, "select count(name) as count_name from user having count_name > 1");
});