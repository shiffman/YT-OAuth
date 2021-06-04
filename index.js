// Based on
// https://github.com/AidanLovelace/Express-Google-OAuth2-Tutorial

const express = require('express');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');

const OAuth2 = google.auth.OAuth2;
const CONFIG = require('./config');

const app = express();
app.use(express.static('public'));
app.listen(CONFIG.port, () => {
  console.log(`Listening on port ${CONFIG.port}`);
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/oauth', function (request, response) {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: CONFIG.oauth2Credentials.scopes,
  });
  response.send({ loginLink });
});

app.get('/auth_callback', function (request, response) {
  console.log('auth_callback');
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  if (request.query.error) {
    console.log(request.query.error);
    return response.redirect('/');
  } else {
    oauth2Client.getToken(request.query.code, function (err, token) {
      if (err) {
        console.log(err);
        return response.redirect('/');
      }
      response.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      return response.redirect('/query');
    });
  }
});

app.get('/getSub', async function (request, response) {
  if (!request.cookies.jwt) {
    return response.redirect('/');
  }

  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  oauth2Client.credentials = jwt.verify(request.cookies.jwt, CONFIG.JWTsecret);
  const service = google.youtube('v3');
  const yt = await service.subscriptions.list({
    auth: oauth2Client,
    mine: true,
    part: 'snippet,contentDetails',
    pageToken: request.query.pageToken,
    maxResults: 50,
  });
  response.json(yt.data);
});

// app.get('/getMembers', async function (request, response) {
//   if (!request.cookies.jwt) {
//     return response.redirect('/');
//   }

//   const oauth2Client = new OAuth2(
//     CONFIG.oauth2Credentials.client_id,
//     CONFIG.oauth2Credentials.client_secret,
//     CONFIG.oauth2Credentials.redirect_uris[0]
//   );

//   oauth2Client.credentials = jwt.verify(request.cookies.jwt, CONFIG.JWTsecret);
//   const service = google.youtube('v3');
//   // const yt = await service.members.list({
//   try {
//     const yt = await service.sponsors.list({
//       auth: oauth2Client,
//       part: 'snippet',
//       // pageToken: request.query.pageToken,
//       maxResults: 50,
//     });
//     response.json(yt.data);
//   } catch (err) {
//     console.log(err);
//     response.json({ status: 'error' });
//   }
// });
