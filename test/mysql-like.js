import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("general like", t => {
    var sql;
    var sql = q()
        .select("*")
        .from("user")
        .like("name", "joe")
        .get();

    t.is(sql, "select * from user where name like '%joe%'");
});

test("right like", t => {
    var sql = q()
        .select("*")
        .from("user")
        .like("name", "joe", "right")
        .get();

    t.is(sql, "select * from user where name like 'joe%'");
});

test("left like", t => {
    var sql = q()
        .select("*")
        .from("user")
        .like("name", "joe", "left")
        .get();

    t.is(sql, "select * from user where name like '%joe'");
});

test("right like inside expr", t => {
    var sql = q()
        .select("*")
        .from("user")
        .where("name %", "joe")
        .get();
    t.is(sql, "select * from user where name like '%joe%'");
});

test("begin regex", t => {
    var sql = q()
        .select("*")
        .from("user")
        .where("name ^%", "joe")
        .get();
    t.is(sql, "select * from user where name like 'joe%'");
});

test("end regex", t => {
    var sql = q()
        .select("*")
        .from("user")
        .where("name %$", "joe")
        .get();

    t.is(sql, "select * from user where name like '%joe'");

});
