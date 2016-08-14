import Sql from "./sql";

export = MySql;

class MySql extends Sql {

    constructor() {
        super();
    }

    getLimit(sql: string, limit: number, offset?: number) {
        sql += (offset !== undefined) ? `limit ${offset}, ${limit}` : `limit ${limit}`;
        return sql;
    }
}