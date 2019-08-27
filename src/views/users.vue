<template>
    <div class="index">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框组件和按钮组件的添加 -->
        <div style="margin-top: 15px;">
            <el-input
                v-model="userobj.query"
                placeholder="请输入内容"
                class="input-with-select"
                style="width:300px;margin-right:20px"
                @keydown.13.native="search"
            >
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="success" round @click="addUser = true">添加角色</el-button>
        </div>
        <!-- 表单内容 -->
        <el-table :data="userList" style="width: 100% ;margin-top:20px" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="address" label="用户权限">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="qxbtn(scope.row.id,scope.row.mg_state)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="editUserbtn(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
                        <el-button type="info" icon="el-icon-share" @click="assign(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button
                            type="warning"
                            icon="el-icon-delete"
                            @click="delUser(scope.row.id)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userobj.pagenum"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="userobj.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        <!-- 添加用户按钮 -->
        <el-dialog title="添加用户" :visible.sync="addUser">
            <el-form
                :model="adduserinfo"
                :label-width="formLabelWidth"
                :rules="rules"
                ref="adduser"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="adduserinfo.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="adduserinfo.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="adduserinfo.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="adduserinfo.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUser = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑用户按钮 -->
        <el-dialog title="编辑用户" :visible.sync="editUser">
            <el-form :model="edituserinfo" :label-width="formLabelWidth" ref="editUser">
                <el-form-item label="用户名">
                    <el-input
                        v-model="edituserinfo.username"
                        auto-complete="off"
                        disabled
                        style="width:100px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="edituserinfo.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="edituserinfo.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUser = false">取 消</el-button>
                <el-button type="primary" @click="edit()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 分配用户按钮 -->
        <el-dialog title="分配用户" :visible.sync="assignUser">
            <el-form :model="assignuserinfo">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input
                        v-model="assignuserinfo.username"
                        auto-complete="off"
                        disabled
                        style="width:100px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="value" clearable placeholder="请选择" @change="newValue">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assignUser = false">取 消</el-button>
                <el-button type="primary" @click="assignrole()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    users,
    addUsers,
    delUsers,
    editUsers,
    qxglUsers,
    assignUsers
} from "@/api/users.js";
import { roles } from "@/api/roles.js";
export default {
    data() {
        return {
            //分配角色信息
            assignuserinfo: {
                username: "",
                rid: "",
                id: ""
            },
            //获取角色信息
            roleList: [],
            value: "",
            //设置添加用户的信息
            addUser: false,
            formLabelWidth: "120px",
            adduserinfo: {
                username: "",
                password: "",
                email: "",
                mobile: ""
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
                ],
                email: [
                    {
                        required: true,
                        message: "请输入用户邮箱",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    { required: true, message: "请输入手机号", trigger: "blur" }
                ]
            },
            //设置编辑用户
            editUser: false,
            edituserinfo: {
                username: "",
                id: "",
                email: "",
                mobile: ""
            },
            //分配角色信息
            assignUser: false,
            //总页数
            total: 0,
            userList: [],
            userobj: {
                query: "",
                pagenum: 1,
                pagesize: 2
            }
        };
    },
    methods: {
        //设置分配角色
        assign(row) {
            this.assignUser = true;
            //初始化数据
            this.assignuserinfo.username = row.username;
            this.assignuserinfo.rid = row.rid;
            this.assignuserinfo.id = row.id;
            this.value = row.rid;
        },
        assignrole() {
            this.assignUser = false;
            assignUsers(this.assignuserinfo.id, this.assignuserinfo.rid)
                .then(res => {
                    if (res.data.meta.status === 200) {
                        this.init();
                        this.$message({
                            type: "success",
                            message: "角色分配成功!"
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "角色分配失败"
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "角色分配失败"
                    });
                });
        },
        newValue() {
            this.assignuserinfo.rid = this.value;
        },
        //用户权限设置
        qxbtn(id, type) {
            qxglUsers(id, type)
                .then(res => {
                    if (res.data.meta.status === 200) {
                        this.$message({
                            type: "success",
                            message: "权限设置成功!"
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "权限设置失败"
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "权限设置失败"
                    });
                });
        },
        //编辑用户业务的
        editUserbtn(row) {
            this.editUser = true;
            this.edituserinfo.id = row.id;
            this.edituserinfo.username = row.username;
            this.edituserinfo.email = row.email;
            this.edituserinfo.mobile = row.mobile;
        },
        edit() {
            this.$refs.editUser.validate(valid => {
                if (valid) {
                    this.editUser = false;
                    editUsers(this.edituserinfo)
                        .then(res => {
                            if (res.data.meta.status === 200) {
                                this.init();
                                this.$message({
                                    type: "success",
                                    message: "编辑成功!"
                                });
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "编辑失败"
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "编辑失败"
                            });
                        });
                } else {
                    this.$message({
                        type: "info",
                        message: "编辑失败"
                    });
                }
            });
        },
        //添加用户业务的
        add() {
            this.$refs.adduser.validate(valid => {
                {
                    if (valid) {
                        addUsers(this.adduserinfo)
                            .then(res => {
                                this.addUser = false;
                                if (res.data.meta.status === 201) {
                                    this.$message.success(res.data.meta.msg);
                                    this.$refs.adduser.resetFields();
                                    this.init();
                                } else {
                                    this.$message.error(res.data.meta.msg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.$message.error(res.data.meta.msg);
                    }
                }
            });
        },
        //删除提示
        delUser(id) {
            this.$confirm("此操作将永久删除该用户, 是否继续?", "删除提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    delUsers(id)
                        .then(res => {
                            if (res.data.meta.status === 200) {
                                if (
                                    this.total % this.userobj.pagesize == 1 ||
                                    this.userobj.pagesize == 1
                                ) {
                                    this.userobj.pagenum--;
                                    this.init();
                                } else {
                                    this.init();
                                }
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "已取消删除"
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.userobj.pagesize = val;
            this.init();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.userobj.pagenum = val;
            this.init();
        },
        search() {
            this.userobj.pagenum = 1;
            this.init();
        },
        init() {
            // console.log(this.userobj.pagenum);
            // console.log(this.userobj.pagesize);
            users(this.userobj)
                .then(res => {
                    // console.log(res);
                    this.total = res.data.data.total;
                    this.userList = res.data.data.users;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.init();
        roles()
            .then(res => {
                this.roleList = res.data.data;
            })
            .catch(err => {
                console / log(err);
            });
    }
};
</script>
<style lang="less" scoped>
</style>