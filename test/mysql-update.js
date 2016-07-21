import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test(t => {
    var sql;

    sql = sqldriver
        .set("name", "Mary")
        .from("user")
        .update()
        .get();

    t.is(sql, "update user set name = 'Mary'");


    sql = sqldriver
        .set({ name: "Mary", "job_id": 3 })
        .from("user")
        .update()
        .get();

    t.is(sql, "update user set name = 'Mary', job_id = 3");


    sql = sqldriver
        .set("name", "Joe")
        .from("user")
        .where("id", 12)
        .update()
        .get();

    t.is(sql, "update user set name = 'Joe' where id = 12");

    sql = sqldriver
        .update("user")
        .set("name", "Joseph")
        .where("name", "Joe")
        .get();

    t.is(sql, "update user set name = 'Joseph' where name = 'Joe'");
});