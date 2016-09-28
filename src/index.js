const search = require('./github/search');
const saveToFirebase = require('./firebase/saveToFirebase');

search(process.argv[2], (result) => {
  /**/console.log(JSON.stringify(result, null, 2));/* -debug- */
  // throw new Error('123');
});
