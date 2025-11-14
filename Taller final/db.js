// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",     // En XAMPP el usuario root NO tiene contraseña
    database: "taller_final",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err);
        return;
    }
    console.log("✅ Conexión exitosa a MySQL");
});

module.exports = connection;
