const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const InstrumentosSchema = Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        enum: ['cuerda', 'viento', 'percusion', 'electricos']
    },
    marca: {
        type: String,
    },
    precio: {
        type: Number,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Instrumentos", InstrumentosSchema);