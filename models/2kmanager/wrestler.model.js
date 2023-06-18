const { Connection } = require("./db.connection");

class Wrestler extends Connection {
    fields = {
        ...this.parentFields,
        name: { name: "name", required: true, type: "STR" },
        alias: { name: "alias", required: false, type: "STR" },
        sex: { name: "sex", required: true, type: "STR" },
        brand: { name: "brand", required: true, type: "STR" },
        status: { name: "status", required: true, type: "STR" },
        is_tag: { name: "is_tag", required: false, type: "INT" },
        is_champ: { name: "is_champ", required: false, type: "INT" },
        twitter_account: { name: "twitter_acc", required: true, type: "STR" },
        twitter_name: { name: "twitter_name", required: true, type: "STR" },
        finisher: { name: "finisher", required: true, type: "STR" },
        image: { name: "image_name", required: false, type: "STR" },
        kayfabe: { name: "kayfabe_status", required: true, type: "STR" },
        twitter_image: { name: "twitter_image", required: false, type: "STR" },
        overall: { name: "overall", required: true, type: "INT" },
        category: { name: "categories", required: false, type: "STR" },
    };

    static tableName = "wrestler";

    constructor() {
        super();
        this.table = Wrestler.tableName;
    }

    wrapSelect(fields = [], where = [], limit = 0, offset = 0) {
        return this.select(fields, where, limit, offset) + " ORDER BY name ASC";
    }

    async findWithChampionships() { 
        const sql = `SELECT wr.id, wr.name, wr.sex AS sex, wr.brand AS brand, wr.status AS status, wr.image_name AS image, wr.overall AS overall,
            ( SELECT chs.name FROM wrestler w INNER JOIN championship_reigns chr ON chr.wrestler_id = w.id INNER JOIN championship chs ON chs.id = chr.championship_id WHERE w.id = wr.id AND chs.tag = FALSE AND chr.current = TRUE AND chs.active = TRUE ) AS championship ,
            ( SELECT chs.image FROM wrestler w INNER JOIN championship_reigns chr ON chr.wrestler_id = w.id INNER JOIN championship chs ON chs.id = chr.championship_id WHERE w.id = wr.id AND chs.tag = FALSE AND chr.current = TRUE AND chs.active = TRUE ) AS championship_image
            FROM wrestler wr WHERE wr.status = 'active' ORDER BY wr.name ASC`;
        
        const result = await this.query(sql);
        return result.map(it => {
            const base = {
                id: it.id,
                name: it.name,
                sex: it.sex,
                brand: it.brand,
                status: it.status,
                image: it.image,
                overall: it.overall,
                championship: false,
            }

            if (it.championship) {
                return {
                    ...base,
                    championship: {
                        name: it.championship,
                        // short: it.championship_short,
                        image: it.championship_image,
                    }
                }
            }
            return base;
        })
    }
}

module.exports = {
    Wrestler,
};
