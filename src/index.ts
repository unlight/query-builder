import Sql from "./sql";

export = {
    create(driver: string): () => Sql {
        var classRef = this.class(driver);
        if (!classRef) {
            throw new Error(`Unknown driver type: ${driver}`);
        }
        return () => new classRef();
    },
    class(name: string): Sql {
        switch(name) {
            case "mysql": return require("./mysql");
            case "sqlite": return require("./sqlite");
        }
        throw new Error(`Unknown class name ${name}`);        
    }
};