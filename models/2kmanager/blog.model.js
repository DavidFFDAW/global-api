const { Connection } = require('./db.connection');

class Blog extends Connection {
    fields = {
        ...this.parentFields,
        image: { name: 'image', required: false, type: 'STR'},
        title: { name: 'title', required: true, type: 'STR'},
        content: { name: 'content', required: true, type: 'STR'},
        exceptr: { name: 'exceptr', required: false, type: 'STR'},
        visible: { name: 'visible', required: false, type: 'INT'},
        category: { name: 'category', required: false, type: 'STR'},
    }

    static tableName = 'news';

    constructor() {
        super();
        this.table = Blog.tableName;
    }
}

module.exports = {
    Blog
}