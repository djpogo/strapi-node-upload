//version 3.1.1
module.exports = {
  settings: {
      parser: {
        enabled: true,
        multipart: true,
        formidable: {
          maxFileSize: 5 * 1024 * 1024 * 1024,
        },
      },
    },
  };
