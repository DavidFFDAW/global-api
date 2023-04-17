const { User } = require("../models/2kmanager/users.model");

module.exports = {
    validateToken: (headers) => {
        const bearerHeader = headers["authorization"];
        if (!bearerHeader) return false;

        const bearer = bearerHeader ? bearerHeader.split(" ") : "";
        const bearerToken = bearer[1];

        const user = (new User()).findByToken(bearerToken);
        console.log('user in validation: ', user);

        return Boolean(user);
    },
};
