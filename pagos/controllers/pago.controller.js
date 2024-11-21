const PagoModel = require('../models/pago.model');
const OrdenModel = require('../../orden/models/orden.model');

exports.insert = (req, res) => {
    PagoModel.createPago(req.body)
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
    PagoModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    PagoModel.findById(req.params.pagoId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    PagoModel.patchUser(req.params.pagoId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    PagoModel.removeById(req.params.pagoId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.getByUserId = (req, res) => {
    PagoModel.findByUserId(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByMetodoPago = (req, res) => {
    PagoModel.findByMetodoPago(req.params.metodo)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByOrdenCompra = async (req, res) => {
    const ordenRegex = new RegExp(req.params.nroOrden, 'i');
    const ordenes = await OrdenModel.findByNumOrd( ordenRegex );

    if (!ordenes.length) return res.status(404).json({ message: 'Numero de orden no encontrada' });
    const ordenesIds = ordenes.map(orden => orden._id);

    PagoModel.findByOrdenId(ordenesIds)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByOrdenId = (req, res) => {
    PagoModel.findByOrdenId(req.params.ordenId)
        .then((result) => {
            res.status(200).send(result);
        });
};