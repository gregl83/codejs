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
      "default": 0,
      "separator": "-"
    }
  ],
  "regex": "/^[0-9]\-[0-9]$/"
};


var sandbox;

describe('code factory', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('builds new Code class with options', function(done) {
    var opts = JSON.parse(JSON.stringify(options));

    var Code = Codejs(opts);

    (Code).should.be.type('function');

    done();
  });

  it('requires options.separator type string', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.separator = true;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('requires options.parts type array', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts = true;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('requires options.parts array has item(s)', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts = [];

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('requires options.regex type string if set', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.regex = /^[0-9]$/;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('options.regex can be undefined', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.regex;

    Codejs(opts);

    done();
  });

  it('requires options.part.name type string', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].name = 1;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('requires options.part.type type string or number', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].type = 'object';

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('requires options.part.regex type string if set', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].regex = /^[a-z]$/;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('options.part.regex can be undefined', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].regex;

    Codejs(opts);

    done();
  });

  it('requires options.part.default type string or number', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].default = [];

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('options.part.default can be undefined', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].default;

    Codejs(opts);

    done();
  });

  it('requires options.part.separator type string', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    opts.parts[0].separator = 1;

    should(function() {
      Codejs(opts);
    }).throw();

    done();
  });

  it('options.part.separator can be undefined', function(done) {
    var opts = JSON.parse(JSON.stringify(options));
    delete opts.parts[0].separator;

    Codejs(opts);

    done();
  });
});