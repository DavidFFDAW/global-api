module.exports = {
    validateToken: headers => {
        const bearerHeader = headers['authorization'];

        if (!bearerHeader) return false;

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // database query to check if token is valid to a user in the DB
        // if valid, return true
        // if not valid, return false
        return false;
    }
}