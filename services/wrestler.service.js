const {Wrestler} = require('../models/wrestler.model');
const helper = require('../helpers/helper');
const config = require('../config');

async function findAll(page = 1) {
  const wr = new Wrestler();
  const offset = helper.getOffset(page, config.listPerPage);
  
  const sql = wr.select('*', []);
  const rows = await wr.query(sql);
  const data = wr.parseRowsFields(rows, wr.getFields());

  return {
    wrestlers: data,
  }
}
async function upsert(body) { 
  const wr = new Wrestler();
  const sqlOrError = wr.getUpsertSQL(body);
  if (sqlOrError instanceof Error) return sqlOrError;

  const result = await wr.query(sqlOrError);
  if (result instanceof Error) return result;

  return {
    inserted: result,
  }
}

module.exports = {
  findAll,
  upsert
}
