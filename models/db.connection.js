const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password
}).promise();

class Connection {

    parentFields = {
        id: { name: 'id', required: false },
        created_at: { name: 'created_at', required: false },
        updated_at: { name: 'updated_at', required: false },
    }

    getPool() {
        return pool;
    }

    async query(query) {
        const [rows, fields] = await pool.execute(query);

        return rows;
    }

    parseRowsFields (rows, fields) {
        const fieldsEntries = Object.entries(fields);
        
        return rows.map(row => {
            const acc = {};
            fieldsEntries.forEach(([key, value]) => {
                acc[key] = row[value.name];
            });
            return acc;
        });
    }
}

module.exports = {
    Connection
}