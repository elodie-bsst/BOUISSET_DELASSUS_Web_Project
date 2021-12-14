// utils/companies.repository.js
pool = require("../utils/db.js");

module.exports = {
    getBlankCompany(){ // defines the entity model
        return {
            "company_id": 0,
            "company_name": "XXXX",
            "company_nb_employees": 0,
            "company_location": "XXXX",
            "company_phone_number": 0,
            "company_speciality": 0
        };
    },
    async getAllCompanies(){ 
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM companies";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) { 
            throw err; 
        }
    },
    
    async getOneCompany(compId){ 
        try {
            conn = await pool.getConnection();
            
            sql = "SELECT * FROM companies WHERE company_id = ?";
            const rows = await conn.query(sql, compId);
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
	
    async delOneCompany(compId){ 
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM companies WHERE company_id = ?";
            const okPacket = await conn.query(sql, compId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    },
    async addOneCompany(compId){ 
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO companies (company_id, company_speciality) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, compId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err; 
        }
    },
    async editOneCompany(compId, compName, compEmployees, compLocation, compPhone, compSpeciality){ 
        try {
            conn = await pool.getConnection();
            sql = "UPDATE companies SET company_name=?, company_nb_employees=?, company_location=?, company_phone_number=?, company_speciality=? WHERE company_id=? "; 
            const okPacket = await conn.query(sql, 
                        [compName, compEmployees, compLocation, compPhone, compSpeciality, compId]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    }
};
