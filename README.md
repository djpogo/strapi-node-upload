# Strapi Node Upload

An example project, to this [blog post](https://raoulkramer.de/upload-media-files-to-strapi-within-a-node-process) how to upload binary data from node into strapi by using strapis restful endpoint secured by a role and a user.

## project

a reduced **Song** (Title, File) entity will be filled by a node process, using strapis restful api and its role based access.

This Repository is all about the **[node-import.js](node-import.js)** file.

## setup

`cp .env.example .env`

Provide api user credentials to .env file.

`npm run develop`

put an example mp3 into `import-files` folder and run

`node node-import.js`

