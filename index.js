const express = require('express');
const cors = require('cors');
const app = express();

// Configuración CORS permisiva para evitar bloqueos
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    // DIAGNÓSTICO: Esto imprimirá en los logs de Render qué está llegando
    console.log("--- NUEVO INTENTO DE LOGIN ---");
    console.log("Cuerpo recibido (body):", req.body);

    // FLEXIBILIDAD: Leemos el usuario/password con varios nombres posibles para evitar errores
    const userRecibido = req.body.username || req.body.usuario || req.body.user;
    const passRecibido = req.body.password || req.body.pass || req.body.contrasena;

    if (!userRecibido || !passRecibido) {
        console.log("Faltan datos.");
        return res.status(400).json({ exito: false, mensaje: "Faltan datos de usuario o contraseña." });
    }

    const usuariosPermitidos = [
        { user: "hedam", pass: "admin.05", nombre: "Admin Supremo" },
        { user: "streaming", pass: "diel.1415", nombre: "Stream Mix (Socio)" },
        { user: "user09", pass: "2025", nombre: "Vendedor 1" }
    ];

    // Buscamos coincidencia exacta (usando trim por si se fue un espacio)
    const usuarioEncontrado = usuariosPermitidos.find(u => 
        u.user === userRecibido.trim() && 
        u.pass === passRecibido.trim()
    );

    if (usuarioEncontrado) {
        console.log("Acceso concedido a:", usuarioEncontrado.nombre);
        res.status(200).json({ 
            exito: true, 
            mensaje: `¡Bienvenido ${usuarioEncontrado.nombre}!` 
        });
    } else {
        console.log("Credenciales incorrectas para:", userRecibido);
        res.status(401).json({ 
            exito: false, 
            mensaje: "Usuario o contraseña incorrectos." 
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor HEDAMPRO listo en puerto ${port}`);
});
