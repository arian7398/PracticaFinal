const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const pagoSchema = new Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },    
    montopago: { type: Number, required: true },
    fechapago: { type: Date, default: Date.now },
    metodopago: { type: String, required: true },
    estadopago: { type: String, required: true },
},{
    timestamps: true
});


const Pago = mongoose.model('Pago', pagoSchema);


exports.createPago = (pagoData) => {
  const pago = new Pago(pagoData);
  return pago.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Pago.find()
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
  return Pago.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (id, pagoData) => {
  return Pago.findOneAndUpdate({
      _id: id
  }, pagoData);
};

exports.removeById = (pagoId) => {
  return new Promise((resolve, reject) => {
      Pago.deleteMany({_id: pagoId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findByUserId = (userId) => {
    return Pago.find( {user_id : userId })
        .then((result) => {
            return result;
        });
};

exports.findByMetodoPago = (metodo) => {
    const metodoRegex = new RegExp(metodo, 'i');
    return Pago.find( {metodopago : metodoRegex })
        .then((result) => {
            return result;
        });
};


exports.findByOrdenCompra = (nroOrden) => {
    const metodoRegex = new RegExp(metodo, 'i');
    return Pago.find( {metodopago : metodoRegex })
        .then((result) => {
            return result;
        });
};
  
exports.findByOrdenId = (orderId) => {
    return Pago.find( {order_id : orderId })
        .then((result) => {
            return result;
        });
};