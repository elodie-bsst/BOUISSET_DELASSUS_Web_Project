pool = require("../utils/db.js");

module.exports = {
  async getOneUser(username) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT user_id,user_name,user_email,user_role FROM users WHERE user_name = ? "; // must leave out the password+hash
      const rows = await conn.query(sql, username);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
  async areValidCredentials(username, password) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM USERS WHERE user_name = ? AND user_pass = sha2(concat(user_created, ?), 224) "; // TODO: better salt+pw hash!
      const rows = await conn.query(sql, [username, password]);
      conn.end();

      if (rows.length == 1 && rows[0].user_name === username) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
}; 