/**
 * Build Code class
 *
 * @param {object} options
 * @param {string} options.separator
 * @param {{name:string, type:string|number, [regex]:string|RegExp, [default]:string|number, [separator]:string}[]} options.parts
 * @param {string|RegExp} [options.regex]
 * @returns {Code} class
 */
module.exports = function(options) {
  // validate options main properties
  if ('string' !== typeof options.separator) throw new Error('options.separator must be type string');

  if (!Array.isArray(options.parts) || 0 === options.parts.length) throw new Error('options.parts must be type array');

  // build class options
  var opts = {
    "parts": [],
    "regex": undefined
  };

  // validate main regex option
  if ('undefined' !== typeof options.regex) {
    if ('string' === typeof options.regex) opts.regex = new RegExp(options.regex);
    else throw new Error('options.regex must be type string');
  }

  // validate part options
  options.parts.forEach(function(part) {
    if ('string' !== typeof part.name) throw new Error('options.part.name must be type string');

    if ('string' !== part.type && 'number' !== part.type) throw new Error('options.part.type must be "string" or "number"');

    if ('undefined' !== typeof part.regex) {
      if ('string' === typeof part.regex) part.regex = new RegExp(part.regex);
      else throw new Error('options.part.regex must be type string');
    }

    if ('undefined' !== typeof part.default && 'string' !== typeof part.default && 'number' !== typeof part.default) throw new Error('options.part.default must be type string or number');

    if ('undefined' !== typeof part.separator && 'string' !== typeof part.separator) part.separator = options.separator;

    opts.parts.push(part);
  });

  /**
   * Parse code parts array
   *
   * @param array
   */
  function parseArray(array) {
    var self = this;

    var partsLastIndex = opts.parts.length - 1;

    for (var i=0; i<=partsLastIndex; i++) {
      var part = opts.parts[i];

      var value = array[i];
      if (part.type !== typeof value) {
        if ('undefined' !== typeof part.default) value = part.default;
        else throw new Error('part.type must be type ' + part.type);
      }

      self._array.push(value);
      self._string += (i !== partsLastIndex) ? value + part.separator : value;
      self._object[part.name] = value;
    }
  }

  /**
   * Parse code parts string
   *
   * @param {string} string
   */
  function parseString(string) {
    var self = this;

    var partsLastIndex = opts.parts.length - 1;

    for (var i=0; i<=partsLastIndex; i++) {
      var part = opts.parts[i];

      var value;
      if (i !== partsLastIndex) {
        var index = string.indexOf(part.separator);
        value = string.substr(0, index);
        string = string.substr(index + 1);
      }
      else value = string;

      if (0 === value.length) {
        if ('undefined' !== typeof part.default) value = part.default;
        else throw new Error('part.type must be type ' + part.type);
      } else if ('number' === part.type) {
        value = parseInt(value);
      }

      self._array.push(value);
      self._string += (i !== partsLastIndex) ? value + part.separator : value;
      self._object[part.name] = value;
    }

  }

  /**
   * Parse code parts object
   *
   * @param {object} object
   */
  function parseObject(object) {
    var self = this;

    var partsLastIndex = opts.parts.length - 1;

    for (var i=0; i<=partsLastIndex; i++) {
      var part = opts.parts[i];

      var value = object[part.name];
      if (part.type !== typeof value) {
        if ('undefined' !== typeof part.default) value = part.default;
        else throw new Error('part.type must be type ' + part.type);
      }

      self._array.push(value);
      self._string += (i !== partsLastIndex) ? value + part.separator : value;
      self._object[part.name] = value;
    }
  }


  /**
   * Code Class
   *
   * Note: Immutable
   *
   * @param {array|string|object} parts
   * @constructor
   */
  function Code(parts) {
    var self = this;

    if (!Array.isArray(parts) && 'string' !== typeof parts && 'object' !== typeof parts) throw new Error('parts must be type array, string, or object');

    self._array = [];
    self._string = '';
    self._object = {};

    if (Array.isArray(parts)) {
      parseArray.call(self, parts);
    } else if ('string' === typeof parts) {
      parseString.call(self, parts);
    } else if ('object' === typeof parts) {
      parseObject.call(self, parts);
    }

    Object.freeze(self);
  }

  /**
   * Code to array
   * @returns {Array}
   */
  Code.prototype.toArray = function() {
    return this._array;
  };

  /**
   * Code to string
   * @returns {string}
   */
  Code.prototype.toString = function() {
    return this._string;
  };

  /**
   * Code to object
   * @returns {{}|*}
   */
  Code.prototype.toObject = function() {
    return this._object;
  };

  return Code;
};