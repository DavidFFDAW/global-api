const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password
}).promise();
  
// make it a class
async function query(query) {
	const [rows, fields] = await pool.execute(query);

	return rows;
}

function parseRowsFields (rows, fields) {
    const fieldsEntries = Object.entries(fields);

    return rows.reduce((acc, row) => {
        fieldsEntries.forEach(([key, value]) => {
            acc[key] = row[value];
        });
        return acc;
    }, {});
}

module.exports = {
    query,
    parseRowsFields
}