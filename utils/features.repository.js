// utils/features.repository.js
pool = require("../utils/db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    getBlankFeature(){ // defines the entity model
        return {
            "feat_id": 0,
            "feat_name": "XXX",
            "feat_price": 0,
            "feat_durability": 0,
            "feat_intallation_cost": 0,
            "feat_rentability_per_year": 0
        };
    },
    async getAllFeatures(){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM features";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            throw err; // return false ???
        }
    },
    
    async getOneFeature(featId){ 
        try {
            conn = await pool.getConnection();
            
            sql = "SELECT * FROM features WHERE feat_id=?";
            const rows = await conn.query(sql, featId);
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
    async delOneFeature(featId){ 
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM features WHERE feat_id =?";
            const okPacket = await conn.query(sql, featId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    },
    async addOneFeature(featId){ 
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO features (feat_id) VALUES (NULL) ";
            const okPacket = await conn.query(sql, featId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err; 
        }
    },
    async editOneFeature(featId, featName, featPrice, featDurability, featInstCost, featRentability){ 
        try {
            conn = await pool.getConnection();
            sql = "UPDATE features SET feat_name=?, feat_price=?, feat_durability=?, feat_intallation_cost=?, feat_rentability_per_year=? WHERE feat_id=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [featName, featPrice, featDurability, featInstCost, featRentability, featId]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    }
};
