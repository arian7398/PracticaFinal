const mongoose = require('mongoose');
require('dotenv').config();

let count = 0;
const mongoURI = process.env.MONGODB_URI

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Numero de conexiones al mismo tiempo
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
// Modulo de conexion
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    
    mongoose.connect(mongoURI, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
