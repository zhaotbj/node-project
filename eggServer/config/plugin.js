'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

