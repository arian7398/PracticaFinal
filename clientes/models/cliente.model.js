const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
},{
    timestamps: true
});



const Cliente = mongoose.model('Clientes', clienteSchema);

exports.createCliente = (clienteData) => {
  const cliente = new Cliente(clienteData);
  return cliente.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Cliente.find()
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
  return Cliente.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, clienteData) => {
  return Cliente.findOneAndUpdate({
      _id: id
  }, clienteData);
};

exports.removeById = (clienteId) => {
  return new Promise((resolve, reject) => {
      Cliente.deleteMany({_id: clienteId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByUserId = (clienteUserId) => {
    return Cliente.find( {user_id : clienteUserId } )
        .then((result) => {
            return result;
        });
};
