import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("three params eq", t => {
    var sql = q()
        .select()
        .from("user")
        .where("id", "=", 1)
        .get();
    t.is(sql, "select * from user where id = 1")
});

test("three params gt", t => {
    var sql = q()
        .select()
        .from("user")
        .where("id", ">", "foo")
        .get();
    t.is(sql, "select * from user where id > 'foo'");
});

test("object", t => {
    var sql = q()
        .select("user.*")
        .from("user")
        .where({
            name: "Ivan",
            "id <": 8
        })
        .where("position_id", 3)
        .get();
    t.is(sql, "select user.* from user where name = 'Ivan' and id < 8 and position_id = 3");
});

test("one param foo is null", t => {
    var sql = q()
        .select("user.*")
        .from("user")
        .where("foo is null")
        .get();
    t.is(sql, "select user.* from user where foo is null");
});


test("three params is null", t => {
    var sql = q()
        .select("b.title")
        .from("book")
        .where("b.price", "is", null)
        .get();
    t.is(sql, "select b.title from book where b.price is null");
});