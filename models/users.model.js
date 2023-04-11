const { Connection } = require('./db.connection');

class User extends Connection {
    fields = {
        ...this.parentFields,
        username:
            { name: 'username', required: true, type: 'STR' },
        password:
            { name: 'password', required: true, type: 'STR' },
        email:
            { name: 'email', required: true, type: 'STR' },
        name:
            { name: 'name', required: true, type: 'STR' },
        last_connection:
            { name: 'last_connection', required: false, type: 'STR' },
        email_verified_at:
            { name: 'email_verified_at', required: false, type: 'STR' },
        image:
            { name: 'image', required: true, type: 'STR' },
        type:
            { name: 'type', required: true, type: 'STR' },
        remember_token:
            { name: 'remember_token', required: false, type: 'STR' },
        api_token:
            { name: 'api_token', required: false, type: 'STR' },
    }

    static tableName = 'users';

    constructor() {
        super();
        this.table = User.tableName;
    }

    async findByToken(token) {
        const params = {
            api_token: token
        }

        const result = await this.findOneByFilter(params);
        console.log('Result: ', result);
        return result;
    }
}


module.exports = {
    User
}