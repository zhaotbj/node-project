<template>
  <div class="list">
    <ul>
      <!-- <li class="list_item" v-for="(item, index) in listData" :key="index"
        @click="handleItem(item.id)">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <h2 class="item_title">{{item.title}}</h2>
        </div>
        <div class="summary" v-html="item.content">
          
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ {{item.time}}
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li> -->
    </ul>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <h2 class="item_title">我是标题</h2>
        </div>
        <div class="summary">
          <p >摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p> <span class="el-icon-chat-dot-square"></span>10</p>
          <p><span class="el-icon-view"></span>10</p>
         
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: []
    };
  },
  created() {
    // this.handle()
      },
  methods: {
    handle() {
      
      this.$http.get("http://localhost:3000/").then(res => {
        let {Status, Ret} = res.data
        if(Status ===200) {
          this.listData= Ret
        }
      });
    },
    handleItem(id) {
      // this.$router.push({ path: `/article/${id}` })
      this.$router.push({ name: 'article', params: { id }}) // -> /user/123
 
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/bloglist.scss";
</style>