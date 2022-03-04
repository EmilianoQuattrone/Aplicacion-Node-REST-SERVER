const mongoose = require('mongoose');

const ConexionDB = async() => {

    /**
     {
         useNewUrlParser: true,
         useUnifiedTopology,
         useCreatedIndex: true,
         useFindAndModify: false
     }
     */

    try {

        await mongoose.connect(process.env.MONGO_DB, );
        console.log('Base de datos online');

    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar base de datos');
    }

}

module.exports = {

    ConexionDB
}