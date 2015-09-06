var should = require('should');
var sinon = require('sinon');

var Codejs = require('../');


var sandbox;

describe('code', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('new instance', function(done) {
    //(systime).should.be.instanceOf(EventEmitter);
    //should(systime._timeout).be.null;

    var CodeA = Codejs({name: 'alpha'});

    var codea = new CodeA();

    var CodeB = Codejs({name: 'beta'});

    var codeb = new CodeB();

    var codec = new CodeA();

    var coded = new CodeA();

    var codee = new CodeB();

    done();
  });
});