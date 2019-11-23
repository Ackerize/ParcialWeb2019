var Instrumento = require('../models/instrumentos');
var debug = require('debug')('parcialweb:instrumentos_controller');
let regexLetras = new RegExp('^[a-zA-Z]+$')
let regexNumeros = new RegExp('^[0-9]*$')
let arrSort = ['asc', 'desc']
let arrSortBy = ['createdAt', 'updatedAt', 'nombre', 'tipo', 'marca', 'precio']

module.exports.getOne = (req, res, next) => {
    debug('Buscando instrumento', req.params);
    if(regexLetras.test(req.params.search)){
        Instrumento.findOne({
            nombre: req.params.search
        })
        .then((foundInstrument) => {
            if(foundInstrument)
                return res.status(200).json(foundInstrument)
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        })
    }else{
        throw new Error(`el parametro no coincide con el esperado`);
    }
}

module.exports.getAll = (req, res, next) => {
    if((regexNumeros.test(req.query.size) && regexNumeros.test(req.query.page)
    && arrSort.includes(req.query.sort) && arrSortBy.includes(req.query.sortby)) || Object.keys(req.query).length == 0){
        var perPage = Number(req.query.size) || 10,
            page = req.query.page > 0 ? req.query.page : 0;

        var sortProperty = req.query.sortby || "createdAt",
            sort = req.query.sort || "desc";
        
        debug('User List', {size:perPage,page, sortby:sortProperty,sort})

        Instrumento.find({})
            .limit(perPage)
            .skip(perPage * page)
            .sort({ [sortProperty]: sort})
            .then((instrumentos) => {
                return res.status(200).json(instrumentos)
            }).catch(err => {
                next(err)
            })
    }else{
        throw new Error(`uno o varios de los parametros no es el esperado`);
    }
}


module.exports.register = (req, res, next) => {
    debug("Nuevo instrumento", {
        body: req.body
    });
    Instrumento.findOne({
        nombre: req.body.nombre
    })
    .then((foundInstrument) => {
        if(foundInstrument){
            debug("Instrumento duplicado");
            return res.status(400).json({})
        }else{
            let newInstrument = new Instrumento({
                nombre: req.body.nombre,
                tipo : req.body.tipo || "viento",
                marca: req.body.marca || "",
                precio: req.body.precio || 0
            });
            return newInstrument.save();
        }
    }).then(instrument => {
        return res
            .header('Location', '/instrumentos/')
            .status(201)
            .json({
                nombre: instrument.nombre,
            });
    }).catch(err => {
        next(err);
    });
}

module.exports.update = (req, res, next) => {
    debug("Update instrument", {
        nombre: req.params.index,
        ...req.body
    });

    let update = {
        ...req.body
    }
    if(regexLetras.test(req.params.index)){
        Instrumento.findOneAndUpdate({
            nombre: req.params.index
        }, update, {
            new:true
        })
        .then((updated) => {
            if(updated)
                return res.status(200).json({
                    _id: updated._id,
                    nombre: updated.nombre,
                    tipo: updated.tipo,
                    marca: updated.marca,
                    precio: updated.precio,
                    ok: true
                });
            else
                return res.status(400).json({ok: false});
        }).catch(err => {
            next(err);
        });
    }else{
        throw new Error(`el parametro no coincide con el esperado`);
    }
}

module.exports.delete = (req, res, next) => {
    debug("Delete instrument", {
        nombre: req.params.index,
    });
    if(regexLetras.test(req.params.index)){
        Instrumento.findOneAndDelete({nombre: req.params.index})
        .then((data) => {
            if(data) res.status(200).json({});
            else res.status(404).send();
        }).catch(err => {
            next(err)
        })
    }else{
        throw new Error(`el parametro no coincide con el esperado`);
    }
}