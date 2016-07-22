import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general", t => {

    var sql = q()
        .set("name", "Mary")
        .from("user")
        .update()
        .get();

    t.is(sql, "update user set name = 'Mary'");

    var sql = q()
        .set({ name: "Mary", "job_id": 3 })
        .from("user")
        .update()
        .get();

    t.is(sql, "update user set name = 'Mary', job_id = 3");


    var sql = q()
        .set("name", "Joe")
        .from("user")
        .where("id", 12)
        .update()
        .get();

    t.is(sql, "update user set name = 'Joe' where id = 12");

    var sql = q()
        .update("user")
        .set("name", "Joseph")
        .where("name", "Joe")
        .get();

    t.is(sql, "update user set name = 'Joseph' where name = 'Joe'");
});