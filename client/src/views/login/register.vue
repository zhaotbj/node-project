<template>
  <div class="register_box">
    <el-dialog title="注册" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
          >
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions} from 'vuex';

export default {
  data() {
    return {
      uploadApi: '/home/upload',
      dialogVisible: true,
      ruleForm: {
        userName: "",
        password: "",
        avatar: "",
        gender: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        gender: [{ required: true, message: "请选择", trigger: "change" }],
      },
      imageUrl: null
    }
  },
  methods: {
    ...mapActions({
      registerReq:"registerReq"
    }),
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert('submit!');
          this.ruleForm.avatar = this.imageUrl;
          const res = await this.registerReq(this.ruleForm);
          if(res&&res.flag) {
               this.$message({
                  message: '注册成功！',
                  type: 'success',
                  duration: 2000
                });
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            } else{
              this.$message.error('注册失败!');
            }
            
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforeAvatarUpload(file){
      console.log(file)
       const isJPG = file.type === 'image/jpeg'|| file.type==="image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG、png 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        // this.imageUrl = new Blob([file]);
        // this.imageUrl  = window.URL.createObjectURL(file);
        // console.log(this.imageUrl,'---')
       //获取文件域中选中的图片
        // var reader = new FileReader(); //实例化文件读取对象
        // reader.readAsDataURL(file); //将文件读取为 DataURL,也就是base64编码
        // reader.onload = (ev)=> { //文件读取成功完成时触发
        //     var dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
        //      this.imageUrl  = dataURL; //将DataURL码赋值给img标签
        // }
        return isJPG && isLt2M;
        // return false;
      },
      handleSuccess(response, file, fileList){
        console.log(response, file, fileList);
        if(response.flag){
          this.ruleForm.avatar = response.filePath;
          //获取文件域中选中的图片
        // var reader = new FileReader(); //实例化文件读取对象
        // reader.readAsDataURL(file); //将文件读取为 DataURL,也就是base64编码
        // reader.onload = (ev)=> { //文件读取成功完成时触发
        //     var dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
        //      this.imageUrl  = dataURL; //将DataURL码赋值给img标签
        //   }
        }
        
      }
    }

}
</script>

<style lang="less" scoped>
.register_box {

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #eee;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
}
</style>