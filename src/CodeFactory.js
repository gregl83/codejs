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

  if (!Array.isArray(options.parts)) throw new Error('options.parts must be type array');

  if ('undefined' !== typeof options.regex && 'string' !== typeof options.regex) throw new Error('options.regex must be type string');

  // build class options
  var opts = {
    "separator": options.separator,
    "parts": [],
    "regex": options.regex
  };

  // validate part options
  options.parts.forEach(function(part) {
    if ('string' !== typeof part.name) throw new Error('options.part.name must be type string');

    if ('string' !== part.type && 'number' !== part.type) throw new Error('options.part.type must be "string" or "number"');

    if ('string' === typeof part.regex) part.regex = new RegExp(part.regex);

    if ('undefined' !== typeof part.default && 'string' !== part.default && 'number' !== part.default) throw new Error('options.part.default must be type string or number');

    if ('undefined' !== typeof part.separator && 'string' !== part.separator) throw new Error('options.part.separator must be type string or number');

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