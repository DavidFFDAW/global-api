const wrestler = require('../models/wrestler.model');
const helper = require('../helpers/helper');
const config = require('../config');

async function findAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  const sql = `SELECT * FROM wrestler ORDER BY ${wrestler.fields.created_at} ASC`;
  const rows = await wrestler.connection.query(sql);
  const data = wrestler.connection.parseRowsFields(rows, wrestler.fields);

  return {
    data,
  }
}

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }

  if (quote.quote && quote.quote.length > 255) {
    messages.push('Quote cannot be longer than 255 characters');
  }

  if (quote.author && quote.author.length > 255) {
    messages.push('Author name cannot be longer than 255 characters');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(quote){
  validateCreate(quote);
}

module.exports = {
  findAll,
  create
}
