// utils/habitations.repository.js
pool = require("../utils/db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    getBlankHabitation(){ // defines the entity model
        return {
            "habitation_id": "XXXX",
            "habitation_type": "XXXX",
            "habitation_size": 0,
            "habitation_price": 0,
            "habitation_location": "XXXX",
            "habitation_sun_exposure": "XXXX"
        };
    },
    async getAllHabitation(){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM habitations";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            throw err; // return false ???
        }
    },
    
    async getOneHabitation(habId){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM habitations WHERE habitation_id = ?";
            const rows = await conn.query(sql, carId);
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
            sql = "INSERT INTO habitation (habitation_id, habitation_type,habitation_size,habitation_price,habitation_location,habitation_sun_exposure) VALUES (NULL, ?, NULL,NULL, ?, ?) ";
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
            sql = "UPDATE habitations SET habitation_type=?, habitation_size=?, habitation_price=?, habitation_location=?, habitation_sun_exposure=? WHERE habitation_id=? "; // TODO: named parameters? :something
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
