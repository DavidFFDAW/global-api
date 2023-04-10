const connection = require('./db.connection');
// class extends yeah
const fields = {
    id: 'id',
    name: 'name',
    alias: 'alias',
    sex: 'sex',
    brand: 'brand',
    status: 'status',
    is_tag: 'is_tag',
    is_champ: 'is_champ',
    twitter_account: 'twitter_acc',
    twitter_name: 'twitter_name',
    finisher: 'finisher',
    image: 'image_name',
    kayfabe: 'kayfabe_status',
    twitter_image: 'twitter_image',
    overall: 'overall',
    category: 'categories',
}

fields['created_at'] = 'created_at';
fields['updated_at'] = 'updated_at';

const tableName = 'wrestler';

module.exports = {
    fields,
    tableName,
    connection,
    fields,
}