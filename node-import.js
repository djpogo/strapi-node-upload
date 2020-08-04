require('dotenv').config();
// require fs for filesystem access
const fs = require('fs');
// create form-data body for strapi
const FormData = require('form-data');

const importDir = './import-files';

const strapiUrl = new URL(process.env.STRAPI_URL);
const httpClient = strapiUrl.protocol === 'https:' ? require('https') : require('http');

// json web token will be stored here
let jwt = null;

/**
 * send post request to strapi/auth/local to retrieve api uses jwt
 * @param {String} identifier
 * @param {String} password
 */
function authenticateApiUser(
  identifier,
  password
) {

  // placeholder for POST response data
  let response = '';

  // post body to authenticate api user
  const postBody = JSON.stringify({
    identifier,
    password,
  });

  // create request object
  const req = httpClient.request(
    {
      host: strapiUrl.hostname,
      port: strapiUrl.port,
      protocol: strapiUrl.protocol,
      method: 'POST',
      path: '/auth/local',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postBody.length,
      }
    }, function(res) {
      // store all response data
      res.on('data', (chunk) => {
        response += chunk;
      });
      res.on('end', () => {
        // parse response string to JSON object
        const data = JSON.parse(response);

        // and store jwt "globally"
        jwt = data.jwt;

        // call importSongs() function
        importSongs();
      });
  });

  // send api user credentials to strapi
  req.write(JSON.stringify({
    identifier,
    password,
  }));

  // close request
  req.end();
}

/**
 * import song(s) function
 * walk through given directory and post every song to strapi
 */
function importSongs() {
  fs.readdir(importDir, (error, files) => {
    if (error) {
      console.log('Error!', error);
    } else {
      files.forEach((file) => {

        // check for .mp3 file name ending
        if (file.indexOf('.mp3') < 0) {
          return;
        }

        const form = new FormData();
        form.append('data', JSON.stringify({
          title: file
        }));
        form.append('files.mp3', fs.createReadStream(`${importDir}/${file}`), file);

        const request = httpClient.request(
          {
            method: 'post',
            path: '/songs',
            host: strapiUrl.hostname,
            port: strapiUrl.port,
            protocol: strapiUrl.protocol,
            headers: {
              ...form.getHeaders(),
              Authorization: `Bearer ${jwt}`,
            }
          }, (res) => {
            res.on('error', (error) => {
              console.log(`Error on file ${file}`, error);
            });
          });
          form.pipe(request);
      });
    }
  })
}

// the process starts by authenticating the api user
// this functions will call the import function
// when the user authenticate request is ended:
// `
// res.on('end', () => {
//   // parse response string to JSON object
//   const data = JSON.parse(response);

//   // and store jwt "globally"
//   jwt = data.jwt;

//   // call importSongs() function
//   importSongs();
// });
// `
authenticateApiUser(
  process.env.API_USER_MAIL,
  process.env.API_USER_PASS
);
