const CarritoModel = require('../models/carrito.models');

exports.insert = (req, res) => {
    CarritoModel.createCarrito(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    CarritoModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CarritoModel.findById(req.params.carritoId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    CarritoModel.patchUser(req.params.carritoId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    CarritoModel.removeById(req.params.carritoId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.getByUserId = (req, res) => {
    CarritoModel.findByUserId(req.params.carritoUserId)
        .then((result) => {
            res.status(200).send(result);
        });
};


