export = {
    create(driver: string) {
        var classRef = this[driver];
        if (!classRef) {
            throw new Error(`Unknown driver type: ${driver}`);
        }
        return () => new classRef();
    },
    get mysql() {
        return require("./mysql");
    },
    get sqlite() {
        return require("./sqlite");
    }
};