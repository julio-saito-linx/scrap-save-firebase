import Crawler from 'crawler';
// import url from 'url';

export default class GitHub {
  search = (start_url, cb) => {
    const c = new Crawler({
      maxConnections: 5,
      callback: (error, result, $) => {
        const title = $('title').text();
        const githubResult = {
          title,
          urls: [],
        };

        console.info(`${title} - ${$('a').length} links`);

        $('a').each((index, a) => {
          const url_text = $(a).text();
          const url_href = $(a).attr('href');
          const githubUrl = /https:\/\/github.com\/\w+\/\w+/;
          if (url_href && url_href.match(githubUrl)) {
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

}
