import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general insert case 1", t => {
    var sql = q()
        .set("name", "Mary")
        .from("user")
        .insert()
        .get();
    t.is(sql, "insert into user(name) values('Mary')");
});

test("general insert case 2", t => {
    var sql = q()
        .set({ name: "Mary", "job_id": 3 })
        .from("user")
        .insert()
        .get();
    t.is(sql, "insert into user(name, job_id) values('Mary', 3)");
});
