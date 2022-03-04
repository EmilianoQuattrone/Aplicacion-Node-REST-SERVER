const { OAuth2Client } = require('google-auth-library');

const cliente = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

async function googleVerify(token = '') {

    const ticket = await cliente.verifyIdToken({

        idToken: token,
        audience: process.env.GOOGLE_CLIENTE_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    return {
        nombre: name,
        correo: email,
        imagen: picture
    }
}

module.exports = {
    googleVerify
}