module.exports = app => {
  const mongoose = app.mongoose;const Schema = mongoose.Schema;
  const UserSchema = new Schema({ 
      userName: { type: String },
       password: { type: String },
  
  });
  return mongoose.model('user', UserSchema); }