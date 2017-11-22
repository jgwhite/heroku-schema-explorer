import Component, { tracked } from '@glimmer/component';

interface ISchema {
  title: string;
  description: string;
  definitions: object[];
}

export default class HerokuSchema extends Component {
  @tracked private schema: ISchema;

  constructor(options) {
    super(options);

    this.load();
  }

  private async load() {
    let response = await fetch('https://api.heroku.com/schema', {
      headers: { Accept: 'application/vnd.heroku+json; version=3' }
    });
    let schema = await response.json();

    this.schema = schema;
  }
}
