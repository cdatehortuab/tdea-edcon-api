/* eslint-disable no-underscore-dangle */
const { Map, Set } = require('immutable');

const {
  identity,
  toNumber,
  isNumber,
  toString,
  isString,
} = require('./utils');

class Model {
  constructor(attributes) {
    const { _attributesDefinitionIterator } = this.constructor;
    this._persistedAttributes = Map();
    this._attributes = Map();
    _attributesDefinitionIterator((attributeName, attributeDefinition) => {
      const conversor = (
        (
          attributeDefinition.type
          && attributeDefinition.type.conversor
        ) || identity
      );
      this._attributes = this._attributes.set(attributeName, conversor(attributes[attributeName]));
      Object.defineProperty(this, attributeName, {
        get() {
          return this._attributes.get(attributeName);
        },
        set(value) {
          this._attributes = this._attributes.set(attributeName, conversor(value));
        },
      });
    });
  }

  _markAsPersisted() {
    this._persistedAttributes = this._attributes;
  }

  isDirty() {
    return this._persistedAttributes !== this._attributes;
  }

  static get _attributesDefinitionIterator() {
    return (actionEachAttribute) => {
      const { attributes } = this;
      Object.keys(attributes).forEach(attributeName => actionEachAttribute(
        attributeName,
        attributes[attributeName],
      ));
    };
  }
}

Model.attributes = {};

Model.TYPES = {
  any: {},
  number: {
    conversor: toNumber,
    validator: isNumber,
  },
  string: {
    conversor: toString,
    validator: isString,
  },
  oneOf(values) {
    let valuesSet = values;
    if (!(valuesSet instanceof Set)) valuesSet = Set(values);
    return {
      validator(value) {
        return valuesSet.has(value);
      },
    };
  },
};

module.exports = Model;
