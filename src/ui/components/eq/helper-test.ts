import eq from './helper';

const { module, test } = QUnit;

module('Helper: eq', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(eq([1, 1]), true);
    assert.equal(eq([1, 2]), false);
  });
});
