import Sql from "./sql";

export = class MySql extends Sql {

    constructor() {
        super();
    }

    getLimit(sql: string, limit, offset) {
        sql += "limit " + limit;
        if (offset) {
            sql += " offset " + offset;
        }
        return sql;
    }
}