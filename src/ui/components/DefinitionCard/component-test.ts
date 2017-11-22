import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: DefinitionCard', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<DefinitionCard />`);
    assert.ok(this.containerElement.querySelector('article'));
  });
});
