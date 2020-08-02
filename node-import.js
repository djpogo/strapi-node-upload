require('dotenv').config();
// require fs for filesystem access
const fs = require('fs');
// create form-data body for strapi
const FormData = require('form-data');
// for Non-SSL/localhost strapi endpoint we use http
const http = require('http');
// for SSL/production strapi endpoint we use https
const https = require('https');

const importDir = './import-files';

const strapiUrl = process.env.STRAPI_URL;

const jwt = process.env.JWT;

const httpClient = strapiUrl.indexOf('https') === 0 ? https : http;
// read directory contents
fs.readdir(importDir, (error, files) => {
  if (error) {
    console.log('Error!', error);
  } else {
    files.forEach((file) => {

      const form = new FormData();
      form.append('data', JSON.stringify({
        title: file
      }));
      form.append('files.mp3', fs.createReadStream(`${importDir}/${file}`), file);

      const request = httpClient.request(
        `${strapiUrl}`,
        {
          method: 'post',
          path: '/songs',
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
});
