// 数据库配置以及建立连接
const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'tours'
})

db.connect()

module.exports = (sql, callback) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}