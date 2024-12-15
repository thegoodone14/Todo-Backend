import db from "../config/database.js"

db.query("INSERT INTO todo_db.users (ID_User, Pseudo, Mail, isAdmin, Password, Last_Name, First_Name) VALUE (3, 'test3', 'test3', False, '123456', 'Pour', 'Test3')",
    (err, res)=> {
        if(err) throw err;
        else console.log(res);
    }
);
export default  db;
