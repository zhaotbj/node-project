import service from '../axios/api'
const actions = {
  // 注册
  async userLogin({ commit }, params) {
    try {
      let res = await service.post('/user/login', params);
 
      if (res.flag) {
        commit('setUserInfo', res.message);
        return res;
      }
    } catch (error) {
      return {flag: false }
    }
  },
  // 注册
  async registerReq({ commit }, params) {
    try {
      let res = await service.post("/user/register", params);
      console.log('res', res)
    if (res.flag) {
      commit('setUserInfo', res.data);
      return res;
    }
    } catch (error) {
      return {flag: false }
    }
  },

  // 首页
  async getHomeList({ commit }, params) {
    return await service.get('/article/getAllList?id='+params);
  },

  // 获取文章详情
  async getDetail({commit}, id) {
    return await service.get("/article/getContentById?id="+id)
  },

  // 发布
  async saveArtic({commit}, params) {
    return await service.post("/article/create", params);
  },
  // 获取分类
  async getCategory({commit}, params) {
    return await service.get("/home/getCategory");
  },
  // 上传图片
  async uploadImage({commit}, params) {
    return await service.post("/home/upload", params,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // 获取归档
  async getArchives({commit}, params) {
    return await service.get("/home/archives", params);
  },
  // 点赞
  async updateZhan({commit}, params) {
    return await service.post("/article/zhan", params);
  },
  // 评论
  async updateComment({commit}, params) {
    return await service.post("/article/comment", params);
  },
  // 查评论
  async getCommentByArticleId({commit}, params) {
    return await service.get("/article/getCommentByArticleId?articleId="+params);
  },
};
export default actions;