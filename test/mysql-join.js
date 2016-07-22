import test from "ava";
import lib from "..";
const q = lib.create("mysql");

test("join case 1", t => {
    var sql = q()
        .select("*")
        .from("user")
        .join("role", "role.id = user.role_id")
        .get();

    t.is(sql, "select * from user join role on role.id = user.role_id");
});

test("join case 2", t => {
    var sql = q()
        .select("*")
        .from("user u")
        .leftJoin("role r", "r.id = u.role_id")
        .get();
    t.is(sql, "select * from user u left join role r on r.id = u.role_id");
});
