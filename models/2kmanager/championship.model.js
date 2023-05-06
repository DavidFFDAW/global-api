const { Connection } = require("./db.connection");

class Championship extends Connection {
    fields = {
        ...this.parentFields,
        name: { name: "name", required: false, type: "STR" },
        metadata: { name: "metadata", required: true, type: "STR" },
        gender: { name: "gender", required: true, type: "STR" },
        image: {
            name: "image",
            required: true,
            type: "STR",
        },
        tag: { name: "tag", required: true, type: "INT" },
        active: { name: "active", required: true, type: "INT" },
        brand: { name: "brand", required: false, type: "INT" },
        short_title: { name: "short_title", required: false, type: "STR" },
    };

    static tableName = "championship";

    constructor() {
        super();
        this.table = Championship.tableName;
    }
}

module.exports = { Championship };
