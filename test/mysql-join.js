import test from "ava";
import m from "..";
const sqldriver = m("mysql");

test(t => {
    var sql = sqldriver
        .select("*")
        .from("user")
        .join("role", "role.id = user.role_id")
        .get();

    t.is(sql, "select * from user join role on role.id = user.role_id");
});

test(t => {
    var sql = sqldriver
        .select("*")
        .from("user u")
        .leftJoin("role r", "r.id = u.role_id")
        .get();
    t.is(sql, "select * from user u left join role r on r.id = u.role_id");
});
