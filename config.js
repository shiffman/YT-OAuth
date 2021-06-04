require('dotenv').config();

const port = 3000;
let baseURL = `http://localhost:${port}`;

// If we're deployed to glitch
if (process.env.PROJECT_DOMAIN) {
  baseURL = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

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
    client_secret: process.env.YT_CLIENTSECRET,
    redirect_uris: [`${baseURL}/auth_callback`],
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      // 'https://www.googleapis.com/auth/youtube.channel-memberships.creator',
    ],
  },
};
