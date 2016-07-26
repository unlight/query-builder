import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general group by", t => {
    var sql = q()
        .select("*")
        .from("user")
        .groupBy("name")
        .get();
    t.is(sql, "select * from user group by name");
});
