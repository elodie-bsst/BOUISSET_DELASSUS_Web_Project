// utils/habitations.repository.js
pool = require("../utils/db.js");

module.exports = {
    getBlankHabitation(){ // defines the entity model
        return {
            "habitation_id": "0",
            "habitation_type": "XXX",
            "habitation_size": 0,
            "habitation_price": 0,
            "habitation_location": "XXXX",
            "habitation_sun_exposure": "XXXXX"
        };
    },
    async getAllHabitations(){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM habitations";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) { 
            throw err; 
        }
    },
    
    async getOneHabitation(habId){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM habitations WHERE habitation_id = ?";
            const rows = await conn.query(sql, habId);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            throw err; 
        }
    },
    async delOneHabitation(habId){ 
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM habitations WHERE habitation_id = ?";
            const okPacket = await conn.query(sql, habId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    },
	async addOneHabitation(habId){ 
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO habitations (habitation_id) VALUES (NULL) ";
            const okPacket = await conn.query(sql, habId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err; 
        }
    },
    async editOneHabitation(habId, habType, habSize, habPrice, habLocation, habSunExpo){ 
        try {
            conn = await pool.getConnection();
            sql = "UPDATE habitations SET habitation_type=?, habitation_size=?, habitation_price=?, habitation_location=?, habitation_sun_exposure=? WHERE habitation_id=? "; 
            const okPacket = await conn.query(sql, 
                        [habType, habSize, habPrice, habLocation, habSunExpo, habId]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    }
};
