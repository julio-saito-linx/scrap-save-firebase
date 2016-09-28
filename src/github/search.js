const Crawler = require('crawler');
const url = require('url');

module.exports = function search(start_url, cb) {
  const c = new Crawler({
    maxConnections : 1,
    callback: (error, result, $) => {
      const githubResult = {
        title: $('title').text(),
        urls: [],
      };

      $('a').each((index, a) => {
        const url_text = $(a).text();
        const url_href = $(a).attr('href');
        const githubUrl = /https:\/\/github.com\/\w+\/\w+/;
        if (url_href.match(githubUrl)){
          githubResult.urls.push({
            text: url_text,
            href: url_href,
          });
          c.queue(url_href);
        }
      });

      cb(githubResult);
    }
  });
  return c.queue(start_url);
}
