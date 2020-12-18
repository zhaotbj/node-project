'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  },
  
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};