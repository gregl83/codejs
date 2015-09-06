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
 * @param {{name:string, type:string|number, [regex]:string, [default]:string|number, [separator]:string}[]} options.parts
 * @returns {Code} class
 */
module.exports = function(options) {
  if ('string' !== typeof options.separator) throw new Error('options.separator must be type string');

  if (!Array.isArray(options.parts)) throw new Error('options.parts must be type array');

  var opts = {
    "separator": options.separator,
    "parts": []
  };

  // validate and push parts
  options.parts.forEach(function(part) {
    if ('string' !== typeof part.name) throw new Error('options.part.name must be type string');

    if ('string' !== part.type && 'number' !== part.type) throw new Error('options.part.type must be "string" or "number"');

    if ('string' === part.regex) {
      // todo handle missing regex
    }

    if ('undefined' !== typeof part.default) {
      if ('string' !== part.default && 'number' !== part.default) throw new Error('options.part.default must be type string or number');
    }

    if ('undefined' !== typeof part.separator) {
      if ('string' !== part.separator) throw new Error('options.part.separator must be type string or number');
    }

    // todo build regex test


    opts.parts.push(part);
  });

  // todo separator escape s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

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

    if ('undefined' === typeof parts) throw new Error('parts argument required');

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