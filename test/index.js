import test from "ava";
import lib from "..";

test("smoke test", t => {
    t.truthy(lib);
});

test("mysql driver properties", t => {
    t.truthy(lib.mysql);
});

test("mysql factory", t => {
    var factory = lib.create("mysql");
    var instance = factory()
    t.true(instance instanceof lib.mysql);
});