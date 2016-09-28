import _ from 'lodash/fp';

export default class Markdown {
  getMarkDownBody = (search_result) => {
    const body = [];
    body.push(`### ${_.trim(search_result.title)}\n\n`);

    search_result.urls.map((url) => {
      body.push(`- [${_.trim(url.text)}](${_.trim(url.href)})\n`);
    });

    return body.join('');
  }
}
