const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Cài đặt kết nối cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: '103.138.88.24',
  user: 'ttd01013_database',
  password: 'JLabMVjfftauucPYrbh9',
  database: 'ttd01013_database'
});

// Kết nối với cơ sở dữ liệu MySQL
db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    return;
  }
  console.log('Đã kết nối với máy chủ MySQL.');
});

// Định nghĩa route để lấy tất cả dữ liệu cảm biến
app.get('/api/sensor-data', (req, res) => {
  const query = 'SELECT * FROM sensor_data ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy dữ liệu:', err);
      res.status(500).send('Lỗi máy chủ');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});
