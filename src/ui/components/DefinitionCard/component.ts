import Component, { tracked } from '@glimmer/component';

export default class DefinitionCard extends Component {
  @tracked('args')
  get properties() {
    let { schema, definition } = this.args;
    let { properties = {} } = definition || {};
    let keys = Object.keys(properties);
    let result = keys.map((key) => {
      let attributes = properties[key];
      let { $ref } = attributes;
      let def = $ref ? definitionFor($ref) : attributes;
      return { key, attributes, definition: def };
    });

    function definitionFor(ref) {
      if (!ref) { return null; }
      let tokens = ref.split('/');
      return tokens.reduce((target, token) => {
        if (token === '#') {
          return schema;
        } else {
          return target[token];
        }
      }, schema);
    }

    return result;
  }

  @tracked('args')
  get typeString() {
    let { type = [] } = this.args.definition;
    return type.join(' | ');
  }
}
