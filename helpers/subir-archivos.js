const res = require('express/lib/response');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//Si no mando nada, las extensiones por defecto extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'].
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        //Nombre de la imagen.
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar extensiones.
        if (!extensionesValidas.includes(extension)) {

            return reject(

                `La Extension ${extension} no es permitida, Extensiones permitidas: ${extensionesValidas}.`
            )
        }

        const nombreFinal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreFinal);

        archivo.mv(uploadPath, (err) => {

            console.log(err);
            if (err) {

                reject(err);
            }

            resolve(nombreFinal);
        });
    });
}

module.exports = {

    subirArchivo
}