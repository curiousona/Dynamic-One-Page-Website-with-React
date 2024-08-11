const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Or your MySQL username
    password: 'newpassword', // Your MySQL password
    database: 'banner_db'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('MySQL Connected as id ' + db.threadId);
});

app.get('/banner', (req, res) => {
    db.query('SELECT * FROM banners WHERE id = 1', (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).send('Server error');
        }
        res.send(result[0]);
    });
});

app.post('/banner', (req, res) => {
    const { description, timer, link, is_visible } = req.body;
    db.query(
        'UPDATE banners SET description = ?, timer = ?, link = ?, is_visible = ? WHERE id = 1', 
        [description, timer, link, is_visible], 
        (err, result) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).send('Server error');
            }
            res.send('Banner updated successfully');
        }
    );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
