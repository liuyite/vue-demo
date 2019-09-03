<template>
    <div class="roles">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-button type="success" round @click="addRoles = true">添加角色</el-button>
        </div>
        <!-- 表单内容 -->
        <el-table :data="roleList" style="width: 100% ;margin-top:20px" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-row v-for="first in props.row.children" :key="first.id">
                        <el-col :span="4">
                            <el-tag
                                :type="'success'"
                                :closable="true"
                                style="margin-bottom:5px;margin-right:10px"
                                @close="cut=0; delRoleRigth(props.row,first.id)"
                            >{{first.authName}}</el-tag>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="second in first.children" :key="second.id">
                                <el-col :span="4">
                                    <el-tag
                                        :type="'info'"
                                        :closable="true"
                                        style="margin-bottom:5px;margin-right:20px"
                                        @close="cut=0;delRoleRigth(props.row,second.id)"
                                    >{{second.authName}}</el-tag>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag
                                        :type="'error'"
                                        :closable="true"
                                        v-for="third in second.children"
                                        :key="third.id"
                                        style="margin-bottom:5px;margin-left:10px"
                                        @close="cut=0;delRoleRigth(props.row,third.id)"
                                    >{{third.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-show="props.row.children.length ===0">
                        <h3>暂时没有数据，请添加</h3>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
            <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button type="primary" icon="el-icon-edit" @click="editRoles(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="角色授权" placement="top-start">
                        <el-button type="info" icon="el-icon-share" @click="roleRights(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button
                            type="warning"
                            icon="el-icon-delete"
                            @click="Delete(scope.row.id)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 角色授权对话框 -->
        <el-dialog title="角色授权" :visible.sync="roleDialogFormVisible">
            <el-tree
                :data="rightList"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-expand-all="true"
                :default-checked-keys="checkedArr"
                :props="defaultProps"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updata">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加角色按钮 -->
        <el-dialog title="添加角色" :visible.sync="addRoles">
            <el-form :model="addroleinfo" :label-width="'120px'" :rules="rules" ref="addrole">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addroleinfo.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addroleinfo.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoles = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
            </div>
        </el-dialog>
         <!-- 编辑角色按钮 -->
        <el-dialog title="编辑角色" :visible.sync="editRoleDig">
            <el-form :model="editroleinfo" :label-width="'120px'" ref="editUser">
                <el-form-item label="角色名称">
                    <el-input
                        v-model="editroleinfo.roleName"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editroleinfo.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editRoleDig = false">取 消</el-button>
                <el-button type="primary" @click="edit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    roles,
    delroleRight,
    updateRoleRight,
    addRole,
    delRole,
    editRole
} from "@/api/roles.js";
import { rightInfo } from "@/api/rights.js";
export default {
    data() {
        return {
            editRoleDig:false,
            editroleinfo:{
                roleName: "",
                roleDesc: "",
                id:''
            },
            cut: 0,
            addroleinfo: {
                roleName: "",
                roleDesc: ""
            },
            addRoles: false,
            rules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ],
                roleDesc: [
                    {
                        required: true,
                        message: "请输入角色描述",
                        trigger: "blur"
                    }
                ]
            },
            //存储用户id
            roleId: "",
            roleDialogFormVisible: false,
            roleList: [],
            checkedArr: [], //显示的数据
            rightList: [], //保存数组的数组源
            defaultProps: {
                label: "authName", //需要显示树形列表的属性
                children: "children" // 下一级的数组
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        //编辑角色
        editRoles(row){
            this.editRoleDig = true
            this.editroleinfo.id = row.id
            this.editroleinfo.roleName = row.roleName
            this.editroleinfo.roleDesc = row.roleDesc
            // console.log(this.editroleinfo)
        },
        edit(){
             this.editRoleDig = false
            editRole(this.editroleinfo)
             .then(res => {
                    if (res.data.meta.status === 200) {
                        this.init();
                        this.$message.success(res.data.meta.msg);
                    } else {
                        this.$message.error(res.data.meta.msg);
                    }
                })
                .catch(err => {
                    this.$message.error("数据异常，请稍后重试");
                });
        },
        //删除角色
        Delete(id) {
            this.$confirm("此操作将永久删除该角色, 是否继续?", "删除提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    delRole(id)
                        .then(res => {
                            if (res.data.meta.status === 200) {
                                this.init();
                                this.$message.success(res.data.meta.msg);
                            } else {
                                this.$message.error(res.data.meta.msg);
                            }
                        })
                        .catch(err => {
                            this.$message.error("数据异常，请稍后重试");
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //添加角色
        add() {
            // console.log(this.addroleinfo)
            this.addRoles = false;
            addRole(this.addroleinfo)
                .then(res => {
                    if (res.data.meta.status === 201) {
                        this.init();
                        this.$message.success(res.data.meta.msg);
                    } else {
                        this.$message.error(res.data.meta.msg);
                    }
                })
                .catch(err => {
                    this.$message.error("数据异常，请稍后重试");
                });
        },
        //初始化页面
        init() {
            roles()
                .then(res => {
                    this.roleList = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //实现删除角色权限
        delRoleRigth(row, rightId) {
            console.log(row.id, rightId);
            delroleRight(row.id, rightId)
                .then(res => {
                    if (res.data.meta.status === 200) {
                        if (this.cut === 0) {
                            this.$message.success(res.data.meta.msg);
                            this.cut++;
                        }
                        console.log(res);
                        row.children = res.data.data;

                        // 通过递归实现当这一级权限没有时，就把上一级权限也删除
                        row.children.forEach((v1, i1) => {
                            if (v1.children.length === 0) {
                                this.delRoleRigth(row, v1.id);
                            } else {
                                v1.children.forEach((v2, i2) => {
                                    if (v2.children.length === 0) {
                                        this.delRoleRigth(row, v2.id);
                                    }
                                });
                            }
                        });
                    } else {
                        this.$message.error(res.data.meta.msg);
                    }
                })
                .catch(() => {
                    this.$message.error(res.data.meta.msg);
                });
        },
        //实现角色授权业务
        roleRights(row) {
            this.roleId = row.id;
            rightInfo("tree")
                .then(res => {
                    // console.log(res.data.data);
                    this.rightList = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
            this.roleDialogFormVisible = true;
            // console.log(row);
            this.checkedArr.length = 0;
            if (row.children && row.children.length !== 0) {
                row.children.forEach(first => {
                    if (first.children && first.children.length !== 0) {
                        first.children.forEach(second => {
                            if (
                                second.children &&
                                second.children.length !== 0
                            ) {
                                second.children.forEach(third => {
                                    this.checkedArr.push(third.id);
                                });
                            }
                        });
                    }
                });
            }
        },
        //实现角色授权业务的确定按钮
        updata() {
            //获取树形图的数据
            //    console.log(this.$refs.tree.getCheckedKeys())
            //    console.log(this.$refs.tree.getHalfCheckedKeys())
            var temp = "";
            temp = [
                ...this.$refs.tree.getCheckedKeys(),
                ...this.$refs.tree.getHalfCheckedKeys()
            ].join(",");
            // console.log(temp);
            updateRoleRight(this.roleId, temp)
                .then(res => {
                    if (res.data.meta.status === 200) {
                        this.roleDialogFormVisible = false;
                        this.$message.success(res.data.meta.msg);
                        this.init();
                    } else {
                        this.$message.error(res.data.meta.msg);
                    }
                })
                .catch(() => {
                    this.$message.error("服务器异常");
                });
        }
    }
};
</script>
<style lang="less" scoped>
</style>