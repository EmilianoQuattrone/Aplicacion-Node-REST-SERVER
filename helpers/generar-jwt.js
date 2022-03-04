const jwt = require('jsonwebtoken');
const env = require('dotenv');

//Identificador unico del usuario.
const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.PALABRA_SECRETA, {

                expiresIn: '4h'
            },

            (error, token) => {

                if (error) {

                    console.log(error);
                    reject('No se pudo generar el token');

                } else {

                    resolve(token);
                }
            });
    });
}

module.exports = {

    generarJWT
}