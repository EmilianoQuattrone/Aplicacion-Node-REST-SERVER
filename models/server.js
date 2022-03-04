const express = require("express");
const cors = require('cors');
const { ConexionDB } = require("../database/config");
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.loginPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.uploadsPath = '/api/uploads';
        //Conectar DB.
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.rutas();
    }

    async conectarDB() {

        await ConexionDB()
    }

    rutas() {

        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.loginPath, require('../routes/auth'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
        this.app.use(this.productosPath, require('../routes/productos'));
        this.app.use(this.uploadsPath, require('../routes/uploads'));
    }

    listen() {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body.
        this.app.use(express.json());

        //Directorio public/ index.html
        this.app.use(express.static('public'));

        //FileUpload - Carga de archivos.
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
}

module.exports = {

    Server
}