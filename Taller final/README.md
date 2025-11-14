# Taller Final – Servidor Node.js con MySQL (XAMPP)

Este proyecto es un servidor básico en **Node.js + Express** con conexión a **MySQL** usando **XAMPP**.  
Incluye una ruta inicial que muestra datos desde la base de datos.

---

## 📌 Requisitos

Antes de ejecutar el proyecto, instala:

- **Node.js**
- **XAMPP** (para usar MySQL)
- **npm** (incluido con Node)

---

## 📁 Estructura del Proyecto

TALLER FINAL/
│
├── node_modules/
├── .gitignore
├── db.js
├── index.js
├── package-lock.json
├── package.json
└── README.md

yaml
Copiar código

---

## ⚙️ Configuración de MySQL (XAMPP)

1. Abre **XAMPP**
2. Inicia:
   - ✔️ Apache  
   - ✔️ MySQL
3. En tu navegador abre:  
   http://localhost/phpmyadmin
4. Crea la base de datos:

taller

markdown
Copiar código

5. Crea una tabla llamada:

usuarios

php
Copiar código

6. Con estos campos:

| Campo  | Tipo         | Extra            |
|-------|--------------|------------------|
| id    | INT          | AUTO_INCREMENT   |
| nombre | VARCHAR(100) |                  |
| email | VARCHAR(100) |                  |

7. Inserta algunos datos de prueba.

---

## 🗄️ Archivo de Conexión (`db.js`)

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taller"
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("Conexión exitosa a MySQL");
});

module.exports = db;
🚀 Servidor Express (index.js)
js
Copiar código
const express = require("express");
const db = require("./db");
const app = express();

// Ruta principal
app.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).send("Error en la consulta");
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

*Autor*
Elkin Solis
