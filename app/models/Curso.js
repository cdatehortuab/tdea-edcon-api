const Model = require('../../lib/Model');

class Curso extends Model {}

Curso.MODALIDADES = {
  VIRTUAL: 'Virtual',
  PRESENCIAL: 'Presencial',
};

Curso.attributes = {
  id: { required: true, type: Model.TYPES.string, unique: true },
  nombre: { required: true, type: Model.TYPES.string },
  descripcion: { required: true, type: Model.TYPES.string },
  valor: { required: true, type: Model.TYPES.number },
  modalidad: {
    type: Model.TYPES.oneOf([Curso.MODALIDADES.PRESENCIAL, Curso.MODALIDADES.VIRTUAL]),
  },
  intensidadHoraria: { type: Model.TYPES.string },
};

module.exports = Curso;
