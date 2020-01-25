const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')
router.get("/inseret", async(ctx) => {
    fs.readFile("./newGoods.json", "utf8", (err, data) => {
        data = JSON.parse(data)
        let saveCout = 0;
        console.log(data)
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            console.log(value)
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCout++;
                console.log('成功:' + saveCout);
            }).catch(error => {
                console.log('失败:', error)
            })
        })
    })
    ctx.body = "开始导入数据了"
})

router.get("/inseretAllCategory", async(ctx) => {
    fs.readFile("./data_json/category.json", "utf8", (err, data) => {
        data = JSON.parse(data)
        let saveCout = 0;
        console.log(data)
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let categ = new Category(value);
            categ.save().then(() => {
                saveCout++;
                console.log('成功:' + saveCout);
            }).catch(error => {
                console.log('失败:', error)
            })
        })
    })
    ctx.body = "开始导入数据了...."
})

router.get("/inseretAllCategorySub", async(ctx) => {
    fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
        data = JSON.parse(data)
        let saveCout = 0;
        console.log(data)
        const Categorysub = mongoose.model('CategorySub');
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newSub = new Categorysub(value);
            newSub.save().then(() => {
                saveCout++;
                console.log('成功:' + saveCout);
            }).catch(error => {
                console.log('失败:', error)
            })
        })
    })
    ctx.body = "开始导入数据了...."
})

// 获取商品详情
router.post("/getDetailGoodsInfo",async(ctx)=>{
  console.log(ctx.request.body, '参数')

    try {
        let goodsId=ctx.request.body.goodsId;
        const Goods=mongoose.model('Goods');
        let result=await  Goods.findOne({ID:goodsId}).exec();
        // console.log(result,'result')
        ctx.body={code:200, message:result}
    } catch (error) {
        ctx.body={code:500, message:error}
    }

})
// 读取大类别的api制作
router.get("/getCategoryList",async(ctx)=>{
    try {
        const Category=mongoose.model('Category');
        let result=await  Category.find().exec();
        // console.log(result,'result')
        ctx.body={code:200, message:result}
    } catch (error) {
        ctx.body={code:500, message:error}
    }

})
// 读取小类别
router.post("/getCategorySubList",async(ctx)=>{
    try {
        let categoryId=ctx.request.body.categoryId;
        // let categoryId=1;
        const CategorySub=mongoose.model('CategorySub');
        let result=await  CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
        // console.log(result,'result小类别')
        ctx.body={code:200, message:result}
    } catch (error) {
        ctx.body={code:500, message:error}
    }
})
// 根据商品类别或去商品列表
router.post("/getGoodsListById",async(ctx)=>{
    try {
        let categorySubId=ctx.request.body.id;
        let page=ctx.request.body.page;
        let num=10;
        let start=(page-1)*num;
        console.log(categorySubId,page,'参数')
        // let categorySubId='2c9f6c946016ea9b016016f79c8e0000';
        const Goods=mongoose.model('Goods');
        let result=await  Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec();
        // console.log(result,'result')
        ctx.body={code:200, message:result}
    } catch (error) {
        ctx.body={code:500, message:error}
    }
})
 
module.exports = router;