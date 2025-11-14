// Importaciones
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Conexión a MySQL

// Inicializar app
const app = express();
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});

// ===============================
//        MÉTODO GET
// ===============================

// Obtener todos los productos
app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Error en consulta GET:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

// ===============================
//        MÉTODO POST
// ===============================

// Crear un nuevo producto
app.post("/productos", (req, res) => {
    const { nombre, precio, imagen } = req.body;

    const sql = "INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, imagen], (err, result) => {
        if (err) {
            console.error("❌ Error en POST:", err);
            return res.status(500).json({ error: "Error al insertar" });
        }
        res.json({ message: "Producto creado", id: result.insertId });
    });
});

// ===============================
//        MÉTODO PUT
// ===============================

// Actualizar producto
app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio, imagen } = req.body;

    const sql = "UPDATE productos SET nombre=?, precio=?, imagen=? WHERE id=?";
    db.query(sql, [nombre, precio, imagen, id], (err) => {
        if (err) {
            console.error("❌ Error en PUT:", err);
            return res.status(500).json({ error: "Error al actualizar" });
        }
        res.json({ message: "Producto actualizado" });
    });
});

// ===============================
//        MÉTODO DELETE
// ===============================

// Eliminar producto
app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM productos WHERE id=?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("❌ Error en DELETE:", err);
            return res.status(500).json({ error: "Error al eliminar" });
        }
        res.json({ message: "Producto eliminado" });
    });
});

// ===============================
//      INICIAR SERVIDOR
// ===============================

app.listen(3000, () => {
    console.log("✅ Conexión exitosa a MySQL");
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
