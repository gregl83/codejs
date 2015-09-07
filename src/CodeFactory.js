function processArray() {
  var self = this;
}

function processString() {
  var self = this;
}

function processObject() {
  var self = this;
}

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
    "separator": options.separator,
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

    if ('undefined' !== typeof part.separator && 'string' !== typeof part.separator) throw new Error('options.part.separator must be type string or number');

    opts.parts.push(part);
  });

  /*
   todo
   1-1-1-1

   parts
   type
   separators
   validation

   parse
   */

  function Code(parts) {
    var self = this;

    if (Array.isArray(parts) && 'string' !== typeof parts && 'object' !== typeof parts) throw new Error('parts must be type array, string, or object');

    if (Array.isArray(parts)) {
      processArray.call(self, parts);
    } else if ('string' === typeof parts) {
      processString.call(self, parts);
    } else if ('object' === typeof parts) {
      processObject.call(self, parts);
    }
  }

  return Code;
};