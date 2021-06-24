const ArticleModel = require("../model/schema/Article")
const CommentModel = require("../model/schema/Comment")
const CategoryModel = require("../model/schema/Category")
const {formateTime} = require('../util/util.js')
class ArticleService {
    /**
     * 获取list列表 后续加分页
     * @param {分类id} cateId 
     * @param {模糊查询关键字} search 
     * @returns 
     */
    async getList(cateId, search) {
        try {

            let list = await ArticleModel.find().sort({ "_id": -1 }).exec();

            let arr = []; let cateList=[]

            let result = JSON.parse(JSON.stringify(list))
              result.map(async v=>{
              arr.push(v.categoryId)
              })
            for(let i=0; i<arr.length; i++) {
             const  cateRes = await CategoryModel.find({"_id": arr[i]})
             if(cateRes.length>0){
              cateList.push(cateRes[0])
             }
            }
          
            for(let i=0; i<result.length; i++)  {
              for(let j=0; j<cateList.length; j++) {
                if(result[i].categoryId == cateList[j]._id) {
                  result[i].category = cateList[j].name
                }
              }
        
            } 

            return result
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * 文章详情
     * @param {文章id} id 
     * @returns 
     */
    async getEssayById(id) {

        try {
            let reuslt = await ArticleModel.findOne({ _id: id }).exec();
            return reuslt
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }
    /**
     *  新建文章
     * @param {*} params 
     * @returns 
     */
    async addArticle(params) {
        try {
            const { userId, userName, content,md, title, categoryId, readNumber, commentNumber, thumbUpNumber, summary, createTime } = params
            const obj = {
                userId: userId,
                userName: userName,
                content: content,
				md:md,
                title: title,
                categoryId: categoryId,
                summary: summary, //文章简介
                createTime: Date.now(),
				readNumber:readNumber, // 章阅读量
				commentNumber:commentNumber, // 文章评论数
				thumbUpNumber: thumbUpNumber // 文章点赞数
            }

            console.log(obj, '参数')
            for (let key in obj) {
                if (!obj[key]) {
					
                   return { flag: false, message: "不能为空"+key,data : "不能为空"+key  }
                   
                }
            }
			
            // 添加文章内容
            const newArticle = new ArticleModel(obj);
            const result = await newArticle.save();
            return { flag: true, message: '成功', data : result };
        } catch (error) {
            console.log(error);
            return Promise.resolve(error)
        }
    }
    /**
     * 编辑文章
     * @param {*} bodyParams 
     * @returns 
     */
    async updateArticle(bodyParams) {

        try {
            // 执行更新数据
            const { id, content, title, categoryId, summary, md, readNumber, commentNumber, thumbUpNumber, createTime } = bodyParams
            
            const editObj = {
                content: content,
                title: title,
                categoryId: categoryId,
                summary: summary, //文章简介
                md: md,
                readNumber: readNumber, // 章阅读量
                commentNumber: commentNumber, // 文章评论数
                thumbUpNumber: thumbUpNumber, // 文章点赞数
                createTime: createTime, //  创建时间
                modifiedTime: Date.now().toString(), //修改时间
            }
            // console.log(editObj, '编辑参数')
            for (let key in editObj) {
                if (!editObj[key]) {
                    return { flag: false, message: key + "不能为空", data: key + "不能为空" }
                    
                }
            }

            const resultUpdata = await ArticleModel.update({ _id: id }, editObj);
           
			if (resultUpdata.nModified > 0) {
			  return  { flag: true, message: "操作成功", data: resultUpdata };
			} else {
			  return { flag: false, message: "操作失败", data: resultUpdata };
			}
        } catch (error) {
            console.log(error);
            return { flag: false, message: "操作失败", data: error };
        }
    }

    /**
     * 阅读数
     */
    async updateReadNum(id) {
        try {
            let resultArticle = await ArticleModel.findOne({ _id: id }).exec();
            // thumbUpNumber
            let num = resultArticle.readNumber;
            num += 1;
            console.log('readNumber::', resultArticle.readNumber, 'num::', num, resultArticle.id);
            let update = await ArticleModel.update({ _id: id }, { $set: { readNumber: num } });
            return update
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
        }
    }

    /**
     * 更新赞
     */
    async updateZhan(id) {
        try {
            let resultArticle = await ArticleModel.findOne({ _id: id }).exec();
            let num = resultArticle.commentNumber;
            num += 1;
            let update = await ArticleModel.update({ _id: id }, { $set: { commentNumber: num } });
            return update
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
        }
    }
    /**
     * 评论
     */
    async updateComment(articleId, name, email, url, desc) {
        try {

            let comment = [], commentItem = [], result = [];
            const list = await CommentModel.findOne({ articleId: articleId });

            comment.push({
                name: name,
                email: email,
                url: url,
                desc: desc,
                time: new Date().toLocaleString(),
                createTime: Date.now()
            });
            if (list) {
                let newarr = list.comment.concat(comment);
                result = await CommentModel.update({ "articleId": articleId }, { "$set": { "comment": newarr } })
            } else {
                commentItem = new CommentModel({ articleId: articleId, comment: comment });
                result = await commentItem.save();
            }
            return result
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
        }
    }
    /**
     * 获取评论
     * @param {*} id 
     * @returns 
     */
    async getCommentById(id) {
        try {
            return await CommentModel.find({ articleId: id });
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
        }
    }

}

module.exports = new ArticleService();