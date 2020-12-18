const Service = require('egg').Service;

class UserService extends Service {
  async findAll() {
    /*这里暂时未从数据库获取数据，而是使用了静态数据填充*/
    const users = [
      {id: 1, name: '兰陵王'},
      {id: 2, name: '程咬金'},
      {id: 3, name: '诸葛亮'},
    ]
   
    
    return users;
  }
}

module.exports = UserService;