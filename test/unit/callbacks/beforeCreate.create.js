var Collection = require('../../../lib/waterline/collection'),
    assert = require('assert');

describe('.beforeCreate()', function() {
  var person;

  before(function(done) {
    var Model = Collection.extend({
      identity: 'user',
      adapter: 'foo',
      attributes: {
        name: 'string'
      },

      beforeCreate: function(values, cb) {
        values.name = values.name + ' updated';
        cb();
      }
    });

    // Fixture Adapter Def
    var adapterDef = { create: function(col, values, cb) { return cb(null, values); }};
    new Model({ adapters: { foo: adapterDef }}, function(err, coll) {
      if(err) done(err);
      person = coll;
      done();
    });
  });

  /**
   * Create
   */

  describe('.create()', function() {

    it('should run beforeCreate and mutate values', function(done) {
      person.create({ name: 'test' }, function(err, user) {
        assert(!err);
        assert(user.name === 'test updated');
        done();
      });
    });
  });

});
