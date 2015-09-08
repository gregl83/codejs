var should = require('should');
var sinon = require('sinon');

var Codejs = require('../');


var sandbox;

describe('integration', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('parts separation defaults to factory options', function(done) {
    var Code = Codejs({separator: '-', parts: [{name:'a', type:'number'}, {name:'b', type:'number'}]});

    var code = new Code([1, 2]);

    (code).should.be.instanceOf(Code);

    (code.toArray()).should.eql([1, 2]);
    (code.toString()).should.eql('1-2');
    (code.toObject()).should.eql({a:1, b:2});

    (Object.isFrozen(code)).should.be.true;

    done();
  });
});