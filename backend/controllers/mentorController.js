const db = require('../config/db');

exports.getMentors = async (req, res) => {
    let sql = 'SELECT * FROM mentors';
    const [results]=await db.query(sql);
 
    res.json(results);
    
};
