// 分类
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const categorySchema = new Schema({
    name: { type: String },
    value: { type: Number },
    create_time: String,
  });
  return mongoose.model('Category', categorySchema);
};
