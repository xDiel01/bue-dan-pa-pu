const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    const usuariosPermitidos = [
        { user: "Hedam", pass: "admin.05", nombre: "Admin Supremo" },
        { user: "Streaming", pass: "diel.1415", nombre: "Stream Mix (Socio)" },
        { user: "user09", pass: "2025", nombre: "Vendedor 1" }
    ];

    const usuarioEncontrado = usuariosPermitidos.find(u => u.user === usuario && u.pass === password);

    if (usuarioEncontrado) {
        res.json({ 
            exito: true, 
            mensaje: `¡Bienvenido ${usuarioEncontrado.nombre}!` 
        });
    } else {
        res.json({ exito: false, mensaje: "Credenciales incorrectas." });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});