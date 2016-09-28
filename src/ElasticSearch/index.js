import elasticsearch from 'elasticsearch';

export default class ElasticSearch {
  constructor() {
    this.initElasticSearch();
  }

  initElasticSearch = () => {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'error'
    });
  }

  pingAsync = () => {
    return this.client.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: Infinity,
      // undocumented params are appended to the query string
      hello: 'elasticsearch!',
    });
  }

  saveItem = (key, body) => {
    return this.client.create({
      index: 'items',
      type: 'string',
      id: key,
      body: {
        id: key,
        user_id: 'user_id',
        displayName: 'Mr. Robot',
        photoURL: 'http://lamcdn.net/wonderzine.com/post-cover/pSTsTCzdVEd3a5Pgeyh_XQ-default.jpg',
        body: body,
        created_at: (new Date()).getTime(),
      }
    });
  }

}
