const CategoriaModel = require('../models/categoria.model');

exports.insert = (req, res) => {
    CategoriaModel.createCategoria(req.body)
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
    CategoriaModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CategoriaModel.findById(req.params.categoriaId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    CategoriaModel.patchUser(req.params.categoriaId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    CategoriaModel.removeById(req.params.categoriaId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.getByNom = (req, res) => {
    CategoriaModel.findByNom(req.params.categoriaNom)
        .then((result) => {
            res.status(200).send(result);
        });
};

