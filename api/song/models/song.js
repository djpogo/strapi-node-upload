'use strict';

const mm = require('music-metadata');
const got = require('got');

async function getMp3Metadata(pathOrUrl, parseOption = { duration: true, skipCovers: true }) {
  if (pathOrUrl.startsWith('http')) {
    const body = await got(pathOrUrl).buffer();
    if (body) {
      return await mm.parseBuffer(body, 'audio/mpeg', { duration: true, skipCovers: true });
    }
  }
  // TODO on local file uploads, figure out where the upload directory is stored and replace `./public/`
  // with this value.
  return await mm.parseFile(`./public/${pathOrUrl}`, parseOption);
}

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(model) {
      if (model.mp3) {
        const file = await strapi.plugins['upload'].services.upload.fetch({ id: model.mp3 });
        const mp3Meta = await getMp3Metadata(file.url);
        model.duration = mp3Meta.format.duration;
        model.title = mp3Meta.common.title;
      }
    },
    async beforeUpdate(params, model) {
      if (model.mp3) {
        const file = await strapi.plugins['upload'].services.upload.fetch({ id: model.mp3 });
        const mp3Meta = await getMp3Metadata(file.url);
        model.duration = mp3Meta.format.duration;
        model.title = mp3Meta.common.title;
      }
    }
  }
};
