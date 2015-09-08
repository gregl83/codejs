var should = require('should');
var sinon = require('sinon');

var Codejs = require('../');

var options = {
  "separator": "-",
  "parts": [
    {
      "name": "one",
      "type": "string",
      "regex": "/^[a-z]$/",
      "default": 'a',
      "separator": "-"
    },
    {
      "name": "two",
      "type": "number",
      "regex": "/^[0-9]$/",
      "default": 2,
      "separator": "-"
    }
  ],
  "regex": "/^[a-z]\-[0-9]$/"
};

var parts = {
  '_array': ['a', 2],
  '_string': 'a-2',
  '_object': {'one': 'a', 'two': 2}
};


var sandbox;

describe('code class', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('new code instance with parts array', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code(parts._array);

    (code).should.be.instanceOf(Code);

    (parts._array).should.eql(code.toArray());
    (parts._string).should.eql(code.toString());
    (parts._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });

  it('new code instance with parts string', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code(parts._string);

    (code).should.be.instanceOf(Code);

    (parts._array).should.eql(code.toArray());
    (parts._string).should.eql(code.toString());
    (parts._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });

  it('new code instance with parts object', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code(parts._object);

    (code).should.be.instanceOf(Code);

    (parts._array).should.eql(code.toArray());
    (parts._string).should.eql(code.toString());
    (parts._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });
});