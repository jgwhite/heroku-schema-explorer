import Component, { tracked } from '@glimmer/component';

export default class DefinitionCard extends Component {
  @tracked('args')
  get properties() {
    let { schema, definition } = this.args;
    let { properties = {} } = definition;
    let keys = Object.keys(properties);
    let result = keys.map(key => {
      let attributes = properties[key];
      let { $ref } = attributes;
      let definition = $ref ? definitionFor($ref) : attributes;
      return { key, attributes, definition };
    });

    function definitionFor(ref) {
      if (!ref) { return null; }
      let tokens = ref.split('/');
      return tokens.reduce((result, token) => {
        if (token === '#') {
          return schema;
        } else {
          return result[token];
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
};
