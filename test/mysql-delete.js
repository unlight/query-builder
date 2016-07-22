import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("delete all 1", t => {
    var sql = q()
        .from("user")
        .delete()
        .get();
    t.is(sql, 'delete user');
});

test("delete all 2", t => {
    var sql = q()
        .from("user")
        .delete()
        .get();
    t.is(sql, 'delete user');
});

test("delete where 1", t => {
    var sql = q()
        .from("user")
        .where("id", 12)
        .delete()
        .get();
    t.is(sql, 'delete user where id = 12');
});

test("delete where name string", t => {
    var sql = q()
        .delete("user")
        .where("name", "Joe")
        .get();
    t.is(sql, 'delete user where name = \'Joe\'');
});