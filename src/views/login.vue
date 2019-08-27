<template>
    <div id="login">
        <div class="container">
            <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <img src="../assets/avatar.jpg" alt class="avatar" />
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        placeholder="请输入用户账号"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入用户密码"
                        prefix-icon="el-icon-key"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="login">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from "@/api/login_info.js";
export default {
    data() {
        return {
            loginForm: {
                username: "admin",
                password: "123456"
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户账户",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        login() {
            //实现点击进行二次验证的功能。
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // console.log(123)
                    login(this.loginForm)
                        .then(res => {
                            if (res.data.meta.status === 200) {
                                localStorage.setItem(
                                    "login_info",
                                    res.data.data.token
                                );
                                this.$router.push({name:'home'})
                            } else {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: "warning"
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.$message({
                        message: "服务器异常",
                        type: "warning"
                    });
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less">
#login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4050;
    .container {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 0px 40px 15px 40px;
        margin: 200px auto;
        background: white;
        .avatar {
            position: relative;
            left: 50%;
            width: 120px;
            height: 120px;
            margin-left: -60px;
            margin-top: -60px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid #fff;
            box-shadow: 0 1px 5px #ccc;
            overflow: hidden;
        }
        .login-btn {
            width: 100%;
        }
    }
}
</style>
