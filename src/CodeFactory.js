/**
 * Build Code class
 *
 * @param {object} options
 * @param {string} options.separator
 * @param {{name:string, type:string|number, [default]:string|number, [separator]:string}[]} options.parts
 * @param {string|RegExp} [options.regex]
 * @returns {Code} class
 * @throws {error}
 */
module.exports = function(options) {
  // validate options main properties
  if ('object' !== typeof options) throw new Error('valid options object is required');

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

    if ('undefined' !== typeof part.default && 'string' !== typeof part.default && 'number' !== typeof part.default) throw new Error('options.part.default must be type string or number');

    if ('undefined' === typeof part.separator || 'string' !== typeof part.separator) part.separator = options.separator;

    opts.parts.push(part);
  });

  /**
   * Parse code parts array
   *
   * @param array
   * @throws {error}
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

    if ('object' === typeof opts.regex && !opts.regex.test(self._string)) throw new Error('parts failed regex test');
  }

  /**
   * Parse code parts string
   *
   * @param {string} string
   * @throws {error}
   */
  function parseString(string) {
    var self = this;

    var partsLastIndex = opts.parts.length - 1;

    for (var i=0; i<=partsLastIndex; i++) {
      var part = opts.parts[i];

      var index, value;
      index = string.indexOf(part.separator);
      value = (-1 === index) ? string : string.substr(0, index);
      string = (-1 === index) ? '' : string.substr(index + 1);

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

    if ('object' === typeof opts.regex && !opts.regex.test(self._string)) throw new Error('parts failed regex test');
  }

  /**
   * Parse code parts object
   *
   * @param {object} object
   * @throws {error}
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

    if ('object' === typeof opts.regex && !opts.regex.test(self._string)) throw new Error('parts failed regex test');
  }


  /**
   * Code Class
   *
   * Note: Immutable
   *
   * @param {array|string|object} [parts]
   * @constructor
   * @throws {error}
   */
  function Code(parts) {
    var self = this;

    if (!Array.isArray(parts) && 'string' !== typeof parts && 'object' !== typeof parts) parts = [];

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
   * Get Code part by name
   *
   * @param {string} name
   * @returns {string|number|undefined}
   */
  Code.prototype.get = function(name) {
    return this._object[name];
  };

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