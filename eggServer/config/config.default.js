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
  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    fileExtensions: [ '.png','.jpg' ], // 增加对 txt 扩展名的文件支持
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
  
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '0.0.0.0',
    }
  };
  // 配置跨域
  config.security = {
    　　　　csrf: {
    　　　　　　enable: false
    　　　　},
    　　　　domainWhiteList: [ '*' ]
    　　};
     config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  exports.mongoose = {
    client: {
      // 有用户名和密码的数据库的连接方式
      // url:'mongodb://admin:123456@localhost:27017/test'
      url: 'mongodb://127.0.0.1/eggDemo',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};