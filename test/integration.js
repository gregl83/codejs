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

  it('last part omitted from parts string', function(done) {
    var options = {
      separator: '|',
      parts: [
        {name:'a', type:'string', default:'a'},
        {name:'b', type:'string', default:'b'},
        {name:'c', type:'string', default:'c'},
        {name:'d', type:'string', default:'d'}
      ]
    };

    var Code = Codejs(options);

    var code = new Code('abc|def|ghi');

    (code).should.be.instanceOf(Code);

    (code.toArray()).should.eql(['abc', 'def', 'ghi', 'd']);
    (code.toString()).should.eql('abc|def|ghi|d');
    (code.toObject()).should.eql({a:'abc', b:'def', c:'ghi', d:'d'});

    (Object.isFrozen(code)).should.be.true;

    done();
  });
});