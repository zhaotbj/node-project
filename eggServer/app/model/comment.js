module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommentSchema = new Schema({
    articleId: { type: String },
    comment: { type: Array, unique: false },
    createTime: { type: String, default: new Date().toLocaleString() },
  });

  return mongoose.model('Comment', CommentSchema);
};
