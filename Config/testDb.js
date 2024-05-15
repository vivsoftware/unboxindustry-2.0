const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testjavadb'
});

db.connect((err) => {
    if(err){
        console.error("Error conecting to MySQL: ", err);
    }else{
        console.log("Connected to MySQL database");
    }

    db.on("error", (err) => {
        console.error("Error connecting to MySQL: ", err);
    });
    
});

module.exports = db;