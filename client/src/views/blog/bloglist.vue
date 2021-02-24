<template>
<div>
  <div class="category">
    <h1>分类：</h1>
    <a class="category_item" href="javascript:;" v-for="(v, i) in category" :key="v._id"
    :class="{'active': activeId== i}"
    @click="handleCategory(v,i)">{{v.name}}</a>
    
  </div>

  <div class="list">
    <li
      class="list_item"
      v-for="item in listData"
      :key="item._id"
      @click="handleItem(item._id)"
    >
      <!-- <p class="date">{{ item.createTime }}</p> -->
      <div class="description">
        <h2 class="item_title">{{ item.title }}</h2>
      </div>
      <div class="summary">
        <p v-html="item.summary"></p>
      </div>
      <div class="list-item-action">
        <p>
          
          <span class="time"><i class="el-icon-date"></i>发布时间：&nbsp; @ </span>{{ item.createTime }}
        </p>
         <p>
          
          <span class="cate">分类：</span>  {{ categoryobj[item.category] || '未分类'}}
        </p>
        <p class="commentNumber">
          <span class="el-icon-chat-dot-square"></span>
          {{ item.commentNumber }}
        </p>
        <p class="thumbUpNumber">
          <span class="el-icon-view"></span>
          {{ item.thumbUpNumber }}
        </p>
        <p>
          
         <span class="auth">作者：</span> {{ item.userName }}
        </p>
      </div>
    </li>
  </div>
</div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      listData: [],
      categoryobj: [],
      category:[],
      activeId:0,
      activeRow: {}
    };
  },
  mounted() {
    this.getCateData();
    this.getBlogList();
    this.$Bus.$on('searchEmit',(value)=>{
      console.log('bus', value);
      if(value)  {
        this.activeId = 0
        this.activeRow = {}
        }
      this.getBlogList({cateId: this.activeRow.value, search: value})
    })
  },
  methods: {
    ...mapActions({
      getHomeList:"getHomeList",
      getCategory: 'getCategory',
    }),
    handleCategory(row,i){
      console.log(row);
      this.activeId = i;
      this.activeRow= row;
      this.getBlogList({cateId: row.value, search: ''});
    },
    async getBlogList(params) {
      const res = await this.getHomeList(params? params: '');
      if (res.flag) {
          this.listData = res.data;
        }
    },
    getCateData(){
      this.getCategory().then(res=>{
          if(res.flag){
             res.data.unshift({
                  name: "全部",
                  value: '',
                  _id: "5fc74d7257f01ca91813f2900",
              })
            this.category = res.data;
            let obj = {};
            res.data.map(v=>{
              obj[v.value] = v.name;
            })
            this.categoryobj = obj;
          }
        })
    },
    handleItem(id) {
      console.log(id)
      this.$router.push({ path: `/_id/${id}` })

    }
  }
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/bloglistPC.less");
@import url("@/assets/css/bloglistPhone.less");


</style>