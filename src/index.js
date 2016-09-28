import Github from './Github';
import Firebase from './Firebase';
import Markdown from './Markdown';
import ElasticSearch from './ElasticSearch';
import dotenv from 'dotenv';
dotenv.config({path: '.env-dev'});

const elastic_search = new ElasticSearch();
const firebase = new Firebase();
const github = new Github();
const markdown = new Markdown();

github.search(process.argv[2], (result) => {
  firebase.saveItemAsync(markdown.getMarkDownBody(result))
  .then((key) => {
    return elastic_search.saveItem(key, markdown.getMarkDownBody(result));
  });
});


