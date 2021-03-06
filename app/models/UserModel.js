const sql = require('../config/database');

const User = function(user){
    this.name = user.name;
    this.password = user.password;
};

// User.create = (newUser, result => {
//     sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
//         if (err){
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         console.log("created user: ", {id: res.insertId, ...newUser});
//         result(null, {id: res.insertId, ...newUser});
//     });
// });

// User.findById = (userId, result) => {
//     sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error:", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found user:", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         result({ kind: "not_found" }, null);
//     });
// }

User.findOne = (name, result) => {
    sql.query(`SELECT * FROM users WHERE name = ${name}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user:", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
}

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) { 
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log("user: ", res);
        result(null, res);
    });
}

// User.updateById = (id, user, result) => {
//     sql.query(
//         "UPDATE users SET name = ?, password = ? WHERE id = ?",
//         [user.email, user.name, user.password, id],
//         (err, res) => {
//             if (err){
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 result({kind : "not_found" }, null);
//                 return;
//             }

//             console.log("updated user: ", {id: id, ...user });
//             result(null, { id: id, ...user });
//         }
//     );
// };

// User.remove = (id, result) => {
//     sql.query("DELETE FROM users WHERE id = ?", id, (err,res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0){
//             result({kind : "not_found"}, null);
//             return;
//         }

//         console.log('deleted user with id: ', id);
//         result(null, res);
//     });
// };

// User.removeAll = result => {
//     sql.query("DELETE FROM users", (err,res) => {
//         if (err){
//             console.log("error: ", err);
//             result(null, errr);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} users`);
//         result(null, res);        
//     });
// }

module.exports = User;