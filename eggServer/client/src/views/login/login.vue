<template>
  <div>
    <el-dialog  :destroy-on-close="true" title="登录" :visible.sync="dialogVisible" width="30%">
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
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    };
  },
  destroyed() {
    this.dialogVisible = true;
  },
  methods: {
    ...mapActions({
      userLogin: "userLogin"
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          const res = await this.userLogin(this.ruleForm);
          console.log(res);
          if (res.flag) {
            if(!res.message.isMatch) {
              this.$message.error('账户或密码错误');
              return;
            }
            this.$message({
              message: '登录成功！',
              type: 'success',
              duration: 2000
            });
            this.dialogVisible = false
          } else {
            this.$message.error('账户或密码错误!');
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.el-dialog__body {
  padding: 0 10px;
}
</style>
