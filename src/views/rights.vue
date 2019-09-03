<template>
    <div class="roles">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单内容 -->
        <el-table :data="rightList" style="width:600px" border>
            <el-table-column type="index" width="50px"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="200px"></el-table-column>
            <el-table-column prop="path" label="路径" width="150px"></el-table-column>
            <el-table-column prop="level" label="层级" width="200px">
                <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { rightInfo } from "@/api/rights.js";
export default {
    data() {
        return {
            rightList: []
        };
    },
    mounted() {
        rightInfo("list")
            .then(res => {
                this.rightList = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    filters: {
        levelFilter(level) {
            if (level === "0") {
                return "一级";
            } else if (level === "1") {
                return "二级";
            } else if (level === "2") {
                return "三级";
            }
        }
    }
};
</script>

<style lang="less" scoped>
</style>