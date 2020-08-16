# Strapi Node Upload

An example project, to this [blog post](https://raoulkramer.de/upload-media-files-to-strapi-within-a-node-process) how to upload binary data from node into strapi by using strapis restful endpoint secured by a role and a user.

## custom-route branch
The [custom-route branch](https://github.com/djpogo/strapi-node-upload/tree/custom-route) is the example project to 
this [blog post](https://raoulkramer.de/deliver-images-via-strapi-custom-route-and-koa-js-context-object) to demonstrate a custom route usage.

### custom route fallback image
[fallback image](./public/oleg-ivanov-G_3NA_UoVyo-unsplash.jpg) from [Oleg Ivanov](https://unsplash.com/@olegixanovpht).

## project

a reduced **Song** (Title, File) entity will be filled by a node process, using strapis restful api and its role based access.

This Repository is all about the **[node-import.js](node-import.js)** file.

## setup

`cp .env.example .env`

Provide api user credentials to .env file.

`npm run develop`

put an example mp3 into `import-files` folder and run

`node node-import.js`

