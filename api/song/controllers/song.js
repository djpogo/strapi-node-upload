'use strict';

const fs = require('fs');
const mm = require('music-metadata');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  cover: async (ctx) => {
    const { id } = ctx.params;
    const songData = await strapi.services.song.findOne({ id });
    const image = {};
    try {
      const song = await mm.parseFile(`./public${songData.mp3.url}`, { duration: false, skipCovers: false });
      image.image = song.common.picture[0].data;
      image.type = song.common.picture[0].format;
    } catch (err) {
      image.image = fs.readFileSync('./public/oleg-ivanov-G_3NA_UoVyo-unsplash.jpg');
      image.type = 'image/jpeg';
    }
    ctx.response.set('content-type', image.type);
    ctx.response.body = image.image;
  }
};
