import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test("simple select", t => {
    var sql = sqldriver
        .select()
        .from("user")
        .where("id", 1)
        .get();
    t.is(sql, "select * from user where id = 1")
});

test(t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .beginWhereGroup()
        .where("id <", 12)
        .orOp()
        .where("id >", 19)
        .endWhereGroup()
        .andOp()
        .where("job_id", 5)
        .get();

    t.is(sql, 'select * from user where (id < 12 or id > 19) and job_id = 5');
});