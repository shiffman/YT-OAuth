const port = 3000;
// const baseURL = `https://youtube-oauth-example.glitch.me`;
const baseURL = `http://localhost:${port}`;

require('dotenv').config();

module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: process.env.JWT_SECRET,
  baseURL: baseURL,
  port: port,

  oauth2Credentials: {
    client_id: process.env.YT_CLIENTID,
    project_id: 'Coding Train Test',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.YT_CLIENT_SECRET,
    redirect_uris: [`${baseURL}/auth_callback`],
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
};
