import * as functions from 'firebase-functions';
import fetch = require('isomorphic-fetch');
import btoa = require('btoa');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

export const mailchimpSubscribed = functions.auth.user().onCreate(event => {
  const { email } = event;
  createFetch(email)
    .then(resp => {
      console.log('Se suscribió el usuario ' + email);
      return resp.json();
    })
    .catch(err => console.log('HUBO UN ERROR!!!'));
  return event;
});

function createFetch(email: any) {
  const MAILCHIMP_API_KEY = '';
  const listId = '';
  // NOTE: mailchimp's API uri differs depending on your location. us6 is the east coast.
  const url = 'https://us17.api.mailchimp.com/3.0/lists/' + listId + '/members';
  const method = 'POST';
  const headers = {
    authorization: 'Basic ' + btoa('randomstring:' + MAILCHIMP_API_KEY),
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({ email_address: email, status: 'subscribed' });

  return fetch(url, {
    method,
    headers,
    body
  });
}
