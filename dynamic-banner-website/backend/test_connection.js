const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'newpassword', // Your MySQL password
    database: 'banner_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

connection.end();
