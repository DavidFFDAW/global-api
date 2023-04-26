const { Connection } = require("./db.connection");

class ChampionshipReign extends Connection {
    fields = {
        ...this.parentFields,
        days: { name: "days", required: true, type: 'INT' },
        current: { name: "current", required: true, type: 'INT' },
        wrestler_id: { name: "wrestler_id", required: true, type: 'INT' },
        championship_id: { name: "championship_id", required: true, type: 'INT' },
        won_date: { name: "won_date", required: true, type: "STR" },
        lost_date: { name: "lost_date", required: true, type: "STR" },
    };

    static tableName = "championship_reigns";

    constructor() {
        super();
        this.table = ChampionshipReign.tableName;
    }

    wrapSelect(fields = [], where = [], limit = 0, offset = 0) {
        return this.select(fields, where, limit, offset) + " ORDER BY days DESC";
    }

    parseResponse(rows) {
        const formatted = rows.map((row) => {

            return {
                title_reign_id: row.id,
                wrestler: {
                    id: row.wrestler_id,
                    name: row.wrestler_name,
                    image: row.wrestler_image,
                    sex: row.wrestler_sex,
                },
                championship: {
                    id: row.championship_id,
                    name: row.championship_name,
                    image: row.championship_image,
                    tag: row.championship_tag,
                },
                team: {
                    id: row.team_id,
                    name: row.team_name,
                },
                days: row.days,
                current: row.current,
                won_date: row.won_date,
                lost_date: row.lost_date,
                created_at: row.created_at,
                updated_at: row.updated_at,
            };
        });

        return formatted.sort((a,b) => a.won_date > b.won_date ? -1 : 1).reduce((acc, row) => {
            if (!acc[row.championship.name]) {
                acc[row.championship.name] = [row];
                return acc;
            }
            acc[row.championship.name].push(row);
            return acc;
        }, {});
    }

    async getChampionshipReigns() {
        const sql = "SELECT cr.*, t.name AS team_name, w.name AS wrestler_name, w.image_name AS wrestler_image, w.sex AS wrestler_sex, c.tag AS championship_tag, c.name AS championship_name, c.image AS championship_image, c.gender AS championship_gender FROM championship_reigns cr INNER JOIN wrestler w ON w.id = cr.wrestler_id INNER JOIN championship c ON cr.championship_id = c.id LEFT JOIN teams t ON t.id = cr.wrestler_id WHERE c.active = TRUE ORDER BY days DESC";
        const rows = await this.query(sql);
        // return this.parseRowsFields(rows, this.getFields());
        return this.parseResponse(rows);
    }

    async findOneTitleReignByID(id) {
        const sql = `SELECT cr.*, t.name AS team_name, w.name AS wrestler_name, w.image_name AS wrestler_image, w.sex AS wrestler_sex, c.tag AS championship_tag, c.name AS championship_name, c.image AS championship_image, c.gender AS championship_gender FROM championship_reigns cr INNER JOIN wrestler w ON w.id = cr.wrestler_id INNER JOIN championship c ON cr.championship_id = c.id LEFT JOIN teams t ON t.id = cr.wrestler_id WHERE cr.id = ${id} ORDER BY days DESC LIMIT 1`;
        const rows = await this.query(sql);
        return this.parseResponse(rows);
    }
}

module.exports = {
    ChampionshipReign,
};
