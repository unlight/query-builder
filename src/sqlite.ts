import Sql from "./sql";

export = class SQLite extends Sql {

    constructor() {
        super();
    }
    
    getLimit(sql: string, limit: number, offset: number) {
        sql += "limit " + limit;
        if (offset) {
            sql += " offset " + offset;
        }
        return sql;
    }
}