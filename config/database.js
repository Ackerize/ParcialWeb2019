const mongoose = require('mongoose');
var debug = require('debug')('parcialweb:database');

// Conect to database

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => {
        debug("success Connected to database")
    })
    .catch((err) => {
        debug(err);
        process.exit(1);
    });
}

module.exports = { connect }