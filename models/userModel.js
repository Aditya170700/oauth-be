const connection = require('../connection/mysql.js');

module.exports = {
    findOneByEmail: (email, callback) => {
      connection.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email], function(err, rows) {
        if (err) throw err;
        callback(err, rows[0]);
      });
    },
    save: (user, callback) => {
      connection.query('INSERT INTO users SET ?', user, function(err, result) {
        if (err) throw err;
        callback(result);
      });
    },
}
