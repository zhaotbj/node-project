const ArticleModel = require("../model/schema/Article")
const CommentModel = require("../model/schema/Comment")

class ArticleService {
    /**
     * 获取list列表 后续加分页
     * @param {分类id} cateId 
     * @param {模糊查询关键字} search 
     * @returns 
     */
    async getList(cateId, search) {
        try {
            let result = [];
            if (cateId) {

                result = await ArticleModel.find({ "_id": Number(cateId) }).sort({ "_id": -1 }).exec();
                result.map(v => {
                    v.createTime = formateTime(v.createTime)
                })
            } else if (search) {
                let reg = new RegExp(search)
                result = await ArticleModel.find({ "title": reg }).sort({ "_id": -1 }).exec();
            }
            else {
                result = await ArticleModel.find().sort({ "_id": -1 }).exec();
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
            const { userId, userName, content, title, categoryId, readNumber, commentNumber, thumbUpNumber, summary, createTime } = params
            const obj = {
                userId: userId,
                userName: userName,
                content: content,
                title: title,
                categoryId: categoryId,
                summary: summary, //文章简介
                readNumber: readNumber || 0, // 章阅读量
                commentNumber: commentNumber || 0, // 文章评论数
                thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
                createTime: createTime
            }

            console.log(obj, '参数')
            for (let key in obj) {
                if (!obj[key]) {
                    ctx.body = { flag: false, message: key + "不能为空", data: key + "不能为空" }
                    return
                }
            }
            // 添加文章内容
            const newArticle = new ArticleModel(obj);
            const result = await newArticle.save();
            return result;
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
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
            const { id, content, title, categoryId, summary, readNumber, commentNumber, thumbUpNumber, createTime } = bodyParams
            if (!id) return
            const editObj = {
                content: content,
                title: title,
                categoryId: categoryId,
                summary: summary, //文章简介
                readNumber: readNumber, // 章阅读量
                commentNumber: commentNumber, // 文章评论数
                thumbUpNumber: thumbUpNumber, // 文章点赞数
                createTime: createTime, //  创建时间
                modifiedTime: Date.now().toString(), //修改时间
            }
            // console.log(editObj, '编辑参数')
            for (let key in editObj) {
                if (!editObj[key]) {
                    ctx.body = { flag: false, message: key + "不能为空", data: key + "不能为空" }
                    return
                }
            }

            const resultUpdata = await ArticleModel.update({ _id: id }, editObj);
            return resultUpdata
        } catch (error) {
            console.log(error);
            return Promise.reuslt(error)
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