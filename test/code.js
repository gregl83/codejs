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
      "default": '0',
      "separator": "-"
    },
    {
      "name": "two",
      "type": "number",
      "regex": "/^[0-9]$/",
      "default": 0,
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

var defaults = {
  '_array': ['0', 0],
  '_string': '0-0',
  '_object': {'one': '0', 'two': 0}
};


var sandbox;

describe('code class', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('supports parts array', function(done) {
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

  it('defaults parts to array when invalid type', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code(undefined);

    (code).should.be.instanceOf(Code);

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });

  it('defaults with parts array', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code([null, undefined]);

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    done();
  });

  it('requires valid types in parts array sans defaults', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].default;

    var Code = Codejs(opts);

    should(function() {
      new Code([null, undefined]);
    }).throw();

    done();
  });

  it('supports parts string', function(done) {
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

  it('defaults with parts string', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code('-');

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    done();
  });

  it('defaults with invalid parts string when type should be number', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].type = 'number';

    var Code = Codejs(opts);

    var code = new Code('-');

    (code).should.be.instanceOf(Code);

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });

  it('defaults with parts string set to empty separators', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].type = 'number';

    var Code = Codejs(opts);

    var code = new Code('--');

    (code).should.be.instanceOf(Code);

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    (Object.isFrozen(code)).should.be.true;

    done();
  });

  it('requires valid types in parts string sans defaults', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].default;

    var Code = Codejs(opts);

    should(function() {
      new Code('-');
    }).throw();

    done();
  });

  it('supports parts object', function(done) {
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

  it('defaults with parts object', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    var code = new Code({'one': null, 'two': undefined});

    (defaults._array).should.eql(code.toArray());
    (defaults._string).should.eql(code.toString());
    (defaults._object).should.eql(code.toObject());

    done();
  });

  it('requires valid types in parts object sans defaults', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].default;

    var Code = Codejs(opts);

    should(function() {
      new Code({'one': null, 'two': undefined});
    }).throw();

    done();
  });
});