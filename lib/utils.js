exports.identity = function identity(value) { return value; };
exports.getTrueValue = function getTrueValue() { return true; };

exports.toNumber = function toNumber(value) { return Number(value); };
exports.isNumber = function isNumber(value) { return Number.isNaN(value); };

exports.toString = function toString(value) { return value && value.toString(); };
exports.isString = function isString(value) {
  return typeof value === 'string' || value === null || typeof value === 'undefined';
};
