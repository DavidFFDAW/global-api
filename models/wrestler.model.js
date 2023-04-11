const { Connection } = require('./db.connection');

class Wrestler extends Connection {
    fields = {
        ...this.parentFields,
        name: { name: 'name', required: true, type: 'STR'},
        alias: { name: 'alias', required: false, type: 'STR'},
        sex: { name: 'sex', required: true, type: 'STR'},
        brand: { name: 'brand', required: true, type: 'STR'},
        status: { name: 'status', required: true, type: 'STR'},
        is_tag: { name: 'is_tag', required: false, type: 'INT'},
        is_champ: { name: 'is_champ', required: false, type: 'INT'},
        twitter_account: { name: 'twitter_acc', required: true, type: 'STR'},
        twitter_name: { name: 'twitter_name', required: true, type: 'STR'},
        finisher: { name: 'finisher', required: true, type: 'STR'},
        image: { name: 'image_name', required: false, type: 'STR'},
        kayfabe: { name: 'kayfabe_status', required: true, type: 'STR'},
        twitter_image: { name: 'twitter_image', required: false, type: 'STR'},
        overall: { name: 'overall', required: true, type: 'INT'},
        category: { name: 'categories', required: false, type: 'STR'},
    }

    table = '';
    sql = '';
    static tableName = 'wrestler';

    constructor() {
        super();
        this.table = Wrestler.tableName;
    }

    getFields() {
        return this.fields;
    }

    getTableName() {
        return this.table;
    }

    select(fields = [], where = [], limit = 0, offset = 0) { 
        const fieldsString = (fields.length > 1) ? fields.join(', ') : '*';
        const whereString = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
        const limitString = limit ? `LIMIT ${limit}` : '';
        const offsetString = offset ? `OFFSET ${offset}` : '';

        return `SELECT ${fieldsString} FROM ${this.table} ${whereString}${limitString} ${offsetString}`;
    }

    getUpsertSQL(wrestlerData) {
        const missingEntries = Object.entries(this.fields).filter(([key, value]) => {
           return value.required && !wrestlerData[key];
        });
        const missingEntriesString = missingEntries.map(([key, value]) => key).join(', ');
        
        if (missingEntries.length > 0) throw new Error(`Missing required fields: [ ${missingEntriesString} ]`);

        if (wrestlerData.id) {
            return this.update(wrestlerData);
        }
        return this.insert(wrestlerData);
    }

    insert(wrestlerData) {
        const fields = Object.entries(this.fields).filter(([key, value]) => {
            return wrestlerData[key];
        });
        const fieldsString = fields.map(([key, value]) => value.name).join(', ');
        const valuesString = fields.map(([key, value]) => {
            if (value.type === 'STR') {
                return `'${wrestlerData[key]}'`;
            }
            return wrestlerData[key];
        }).join(', ');

        return `INSERT INTO ${this.table} (${fieldsString}) VALUES (${valuesString})`;
    }

    update(wrestlerData) {
        const id = wrestlerData.id;

        const fields = Object.entries(this.fields).filter(([key, value]) => {
            return wrestlerData[key];
        });
        const fieldsString = fields.map(([key, value]) => value.name).join(', ');
        const valuesString = fields.map(([key, value]) => {
            if (value.type === 'STR') {
                return `'${wrestlerData[key]}'`;
            }
            return wrestlerData[key];
        }).join(', ');

        return `UPDATE ${this.table} SET (${fieldsString}) = (${valuesString}) WHERE id = ${id}`;
    }
}


module.exports = {
    Wrestler
}