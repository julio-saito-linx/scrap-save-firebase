import firebase from 'firebase';

export default class Firebase {
  constructor() {
    this.initFirebase();
  }

  initFirebase = () => {
    const config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      serviceAccount: process.env.FIREBASE_JSON_PATH,
    };
    firebase.initializeApp(config);
  }

  getItems = () => {
    const itemsRef = firebase.database().ref('items');
    itemsRef.once('value').then((result) => {
      /**/console.log('\n>>---------\n result.val():\n', /* -debug- */
      /**/require('util').inspect(result.val(), /* -debug- */
      /**/{ showHidden: false, depth: null, colors: true }), '\n>>---------\n');/* -debug- */
    });
  }

  saveItemAsync = (body) => {
    const itemsRef = firebase.database().ref('items');
    const key = itemsRef.push().key;
    const updates = {};

    updates[`/items/${key}/id`] = key;
    updates[`/items/${key}/user_id`] = 'user_id';
    updates[`/items/${key}/displayName`] = 'Mr. Robot';
    updates[`/items/${key}/photoURL`] = 'http://lamcdn.net/wonderzine.com/post-cover/pSTsTCzdVEd3a5Pgeyh_XQ-default.jpg';
    updates[`/items/${key}/body`] = body;
    updates[`/items/${key}/created_at`] = firebase.database.ServerValue.TIMESTAMP;

    return firebase.database().ref().update(updates)
    .then(() => {
      return key;
    });
  }

}
