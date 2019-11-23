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
        enum: ['cuerda', 'viento', 'percusion', 'electrico'],
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Instrumentos", InstrumentosSchema);