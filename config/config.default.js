/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  }
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/node_blog',  //你的数据库地址，不要端口,后面的admin是数据库名称
      options: {
        useNewUrlParser: true,
      },
    }
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608189823534_3621';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  

  return {
    ...config,
    ...userConfig,
  };
};

