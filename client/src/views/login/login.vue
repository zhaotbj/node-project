<template>
  <div class="sign">
    <div class="login_box">
      <h1>登录</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName" size="mini">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="mini">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
          >确 定</el-button
        >
        <el-button @click="goHome" size="mini">返回首页</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  
  methods: {
    ...mapActions({
      userLogin: "userLogin",
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          const res = await this.userLogin(this.ruleForm);
          console.log(res);
          if (res.flag) {
            if (!res.message.isMatch) {
              this.$message.error("账户或密码错误");
              return;
            }
            this.$message({
              message: "登录成功！",
              type: "success",
              duration: 2000,
            });
            // this.dialogVisible = false;
            this.$router.push('/')
          } else {
            this.$message.error("账户或密码错误!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goHome(){
      this.$router.push('/')
    }
  },
};
</script>

<style lang="less" scoped>
.sign {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  // overflow: hidden;
  .login_box {
    max-width: 500px;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 2px;
    box-sizing: border-box;
        padding: 50px;
    h1{
      font-weight: 400;
      color: #1890FD;
      // font-size: 20px;
      margin-bottom: 15px;
    }
  }
}
</style>