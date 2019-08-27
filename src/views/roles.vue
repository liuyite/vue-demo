<template>
    <div class="roles">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
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
                                @close="delRoleRigth(props.row,first.id)"
                            >{{first.authName}}</el-tag>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="second in first.children" :key="second.id">
                                <el-col :span="4">
                                    <el-tag
                                        :type="'info'"
                                        :closable="true"
                                        style="margin-bottom:5px;margin-right:20px"
                                        @close="delRoleRigth(props.row,second.id)"
                                    >{{second.authName}}</el-tag>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag
                                        :type="'error'"
                                        :closable="true"
                                        v-for="third in second.children"
                                        :key="third.id"
                                        style="margin-bottom:5px;margin-left:10px"
                                        @close="delRoleRigth(props.row,third.id)"
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
                        <el-button type="primary" icon="el-icon-edit"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="角色授权" placement="top-start">
                        <el-button type="info" icon="el-icon-share" @click="roleRights(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button type="warning" icon="el-icon-delete"></el-button>
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
                :default-expand-all="true"
                :default-checked-keys="checkedArr"
                :props="defaultProps"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialogFormVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { roles, delroleRight } from "@/api/roles.js";
import { rightInfo } from "@/api/rights.js";
export default {
    data() {
        return {
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
        roles()
            .then(res => {
                this.roleList = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
        //加载数组源的内容
        rightInfo("tree")
            .then(res => {
                // console.log(res.data.data);
                this.rightList = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        delRoleRigth(row, rightId) {
            console.log(row.id, rightId);
            delroleRight(row.id, rightId)
                .then(res => {
                    if (res.data.meta.status === 200) {
                        this.$message.success(res.data.meta.msg);
                        row.children = res.data.data;
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
            

            // this.roleDialogFormVisible = true;
            // // console.log(row);
            // let arr = [];
            // this.checkedArr = [];
            // console.dir(this.checkedArr)
            // if (row.children && row.children.length !== 0) {
            //     row.children.forEach(first => {
            //         // this.checkedArr.push(first.id);
            //         if (first.children && first.children.length !== 0) {
            //             first.children.forEach(second => {
            //                 //  this.checkedArr.push(second.id);
            //                 if (
            //                     second.children &&
            //                     second.children.length !== 0
            //                 ) {
            //                     second.children.forEach(third => {
            //                        arr.push(third.id);
            //                     });
            //                 }
            //             });
            //         }
            //     });
            //      this.checkedArr = arr;
            // }
            //------------------------------
            // //加载数组源的内容
             rightInfo("tree")
            .then(res => {
                // console.log(res.data.data);
                this.rightList = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
            this.roleDialogFormVisible = true;
            console.log(row);
            this.checkedArr = [];
            if (row.children && row.children.length !== 0) {
                row.children.forEach(first => {
                    this.checkedArr.push(first.id);
                    if (first.children && first.children.length !== 0) {
                        first.children.forEach(second => {
                            this.checkedArr.push(second.id);
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
        }
    }
};
</script>
<style lang="less" scoped>
</style>