const { Connection } = require("./db.connection");

class Team extends Connection {
    fields = {
        ...this.parentFields,
        name: { name: "name", required: true, type: "STR" },
        average: { name: "average", required: false, type: "INT" },
        member_champion_1: { name: "member_champion_1", required: false, type: "INT" },
        member_champion_2: { name: "member_champion_2", required: false, type: "INT" },
        brand: { name: "brand", required: false, type: "INT" },
    };

    static tableName = "wrestler";

    constructor() {
        super();
        this.table = Team.tableName;
    }

    getTeams() {
        const sql = "SELECT t.id AS id, t.name AS `name`, t.average AS average, w1.name AS member_champion_1, w1.image_name AS member_champion_1_image, w2.name AS member_champion_2, w2.image_name AS member_champion_2_image FROM teams t LEFT JOIN wrestler w1 ON t.member_champion_1 = w1.id LEFT JOIN wrestler w2 ON t.member_champion_2 = w2.id";
        return this.query(sql);
    }

    getTeamMembers() { 
        const sql = 'SELECT wt.*, w.name, w.image_name FROM wrestler_team wt INNER JOIN wrestler w ON w.id = wt.wrestler_id';
        return this.query(sql);
    }

    async getAllTeamsWithMembers() { 
        const teams = await this.getTeams();
        const teamMembers = await this.getTeamMembers();
        
        return teams.map((team) => {
            const members = teamMembers.filter((member) => member.team_id === team.id);
            return {
                ...team,
                members,
            };
        });
    }
}

module.exports = {
    Team,
};
