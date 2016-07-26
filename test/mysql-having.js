import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general case", t => {
    var sql = q()
        .select("count", "name", "count_name")
        .from("user")
        .having("count_name >", 1)
        .get();
    t.is(sql, "select count(name) as count_name from user having count_name > 1");
});