const { User } = require("../models/2kmanager/users.model");

module.exports = {
    validateToken: async (headers) => {
        const bearerHeader = headers["authorization"];
        if (!bearerHeader) return false;

        const bearer = bearerHeader ? bearerHeader.split(" ") : "";
        const bearerToken = bearer[1];

        const user = new User();
        const hasUserToken = await user.findByToken(bearerToken);

        return Boolean(hasUserToken);
    },
};
