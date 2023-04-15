const mysql = require("mysql2");
const config = require("../../config");

const pool = mysql
    .createPool({
        host: config.db.host,
        user: config.db.user,
        database: config.db.database,
        password: config.db.password,
    })
    .promise();

class Connection {
    parentFields = {
        id: { name: "id", required: false },
        created_at: { name: "created_at", required: false },
        updated_at: { name: "updated_at", required: false },
    };

    getPool() {
        return pool;
    }

    async query(query) {
        const [rows, fields] = await pool.execute(query);

        return rows;
    }

    parseRowsFields(rows, fields) {
        const fieldsEntries = Object.entries(fields);

        return rows.map((row) => {
            const acc = {};
            fieldsEntries.forEach(([key, value]) => {
                acc[key] = row[value.name];
            });
            return acc;
        });
    }

    getFields() {
        return this.fields;
    }

    getTableName() {
        return this.table;
    }

    async findAll() {
        const rows = await this.query(this.select("*", []));
        return this.parseRowsFields(rows, this.getFields());
    }

    getParametersSerialized(filterParams) {
        return Object.entries(filterParams).map(([key, value]) => {
            if (this.fields[key]) {
                return this.fields[key].type === "STR"
                    ? `${key} LIKE '%${value}%'`
                    : `${key} = ${value}`;
            }
            return "";
        });
    }

    async findByFilter(filterParams) {
        const where = this.getParametersSerialized(filterParams);
        const sql = this.select("*", where);
        const rows = await this.query(sql);
        return this.parseRowsFields(rows, this.getFields());
    }

    async findOneByFilter(filterParams) {
        const where = this.getParametersSerialized(filterParams);
        const sql = this.select("*", where, 1);
        const rows = await this.query(sql);
        return this.parseRowsFields(rows, this.getFields())[0] || {};
    }

    select(fields = [], where = [], limit = 0, offset = 0) {
        const fieldsString = fields.length > 1 ? fields.join(", ") : "*";
        const whereString =
            where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
        const limitString = limit ? `LIMIT ${limit}` : "";
        const offsetString = offset ? `OFFSET ${offset}` : "";

        return `SELECT ${fieldsString} FROM ${this.table} ${whereString}${limitString} ${offsetString}`;
    }

    getUpsertSQL(data) {
        if (data.id) {
            return this.update(data);
        }
        return this.insert(data);
    }

    async upsert(data) {
        const missingEntries = Object.entries(this.fields).filter(
            ([key, value]) => {
                return value.required && !data[key];
            }
        );

        const missingEntriesString = missingEntries
            .map(([key, value]) => key)
            .join(", ");
        if (missingEntries.length > 0)
            throw new Error(
                `Missing required fields: [ ${missingEntriesString} ]`
            );

        const sql = this.getUpsertSQL(data);
        const result = await this.query(sql);
        return result;
    }

    getFieldsAndValues(datas) {
        const fields = Object.entries(this.fields).filter(([key, _]) => {
            return datas[key];
        });
        const fieldsString = fields.map(([_, value]) => value.name).join(", ");
        const valuesString = fields
            .map(([key, value]) => {
                if (value.type === "STR") {
                    return `'${datas[key]}'`;
                }
                return datas[key];
            })
            .join(", ");

        return [fieldsString, valuesString];
    }

    insert(data) {
        const [fieldsString, valuesString] = this.getFieldsAndValues(data);

        return `INSERT INTO ${this.table} (${fieldsString}) VALUES (${valuesString})`;
    }

    update(data) {
        const id = data.id;

        const [fieldsString, valuesString] = this.getFieldsAndValues(data);

        return `UPDATE ${this.table} SET (${fieldsString}) = (${valuesString}) WHERE id = ${id}`;
    }
}

module.exports = {
    Connection,
};
