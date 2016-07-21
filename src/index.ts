import factory from "./factory";

export = function (driver: string) {
    var classRef = factory(driver);
    return new classRef();
};