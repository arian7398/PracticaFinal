const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  categoria: { type: String, required: true, unique: true }
});


const Categoria = mongoose.model('Categoria', categoriaSchema);


exports.createCategoria = (categoriaData) => {
  const categoria = new Categoria(categoriaData);
  return categoria.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Categoria.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, users) {
              if (err) {
                  reject(err);
              } else {
                  resolve(users);
              }
          })
  });
};

exports.findById = (id) => {
  return Categoria.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, categoriaData) => {
  return Categoria.findOneAndUpdate({
      _id: id
  }, categoriaData);
};

exports.removeById = (categoriaId) => {
  return new Promise((resolve, reject) => {
      Categoria.deleteMany({_id: categoriaId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByNom = (categoriaNom) => {
  const categoriaRegex = new RegExp(categoriaNom, 'i');
  return Categoria.find({categoria : categoriaRegex } )
      .then((result) => {
          return result;
      });
};

