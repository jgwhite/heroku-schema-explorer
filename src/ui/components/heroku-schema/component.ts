import Component, { tracked } from '@glimmer/component';

type Schema = {
  title: string,
  description: string,
  definitions: object[]
};

export default class HerokuSchema extends Component {
  @tracked schema: Schema;

  constructor(options) {
    super(options);

    this.load();
  }

  async load() {
    let response = await fetch('https://api.heroku.com/schema', {
      headers: { Accept: 'application/vnd.heroku+json; version=3' }
    });
    let schema = await response.json();

    console.log(schema);

    this.schema = schema;
  }
}
