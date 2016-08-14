import test from "ava";
import lib from "..";

test("smoke test", t => {
    t.truthy(lib);
});

test("mysql factory", t => {
    var factory = lib.create("mysql");
    var instance = factory();
    t.truthy(factory);
});

test("class", t => {
    var driverClass = lib.class("mysql");
    t.true(typeof driverClass === "function");
});