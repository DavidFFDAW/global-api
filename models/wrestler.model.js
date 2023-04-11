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

    static tableName = 'wrestler';

    constructor() {
        super();
        this.table = Wrestler.tableName;
    }
}


module.exports = {
    Wrestler
}