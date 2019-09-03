<template>
    <div class="goodlist">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框组件和按钮组件的添加 -->
        <div style="margin-top: 15px;">
            <el-input
                v-model="goodobj.query"
                placeholder="请输入内容"
                class="input-with-select"
                style="width:300px;margin-right:20px"
                @keydown.13.native="search"
            >
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="success" round @click="addgood">添加商品</el-button>
        </div>
        <!-- 表单内容 -->
        <el-table :data="goodList" style="width: 100% ;margin-top:20px" border>
            <el-table-column type="index" width="50" label="编号"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
            <el-table-column prop="goods_state" label="商品状态" width="100"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
            <el-table-column
                prop="add_time"
                label="创建时间"
                width="180"
            >{{ goodList.add_time | timefilter}}</el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button type="primary" icon="el-icon-edit" @click="editgoods(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="审核" placement="top-start">
                        <el-button type="info" icon="el-icon-share"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button type="warning" icon="el-icon-delete" @click="delGood(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="goodobj.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="goodobj.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>
<script>
import { goodslists, delGoods } from "@/api/goods.js";
import { timefilter } from "@/utils/timer.js";
export default {
    data() {
        return {
            goodList: [],
            goodobj: {
                query: "",
                pagenum: 1,
                pagesize: 10
            },
            total: 0
        };
    },
    methods: {
        //编辑商品
        editgoods(row) {
            this.$router.push({ path: "/home/goods/addgood/" + row.goods_id });
        },
        init() {
            goodslists(this.goodobj).then(res => {
                console.log(res);
                if (res.data.meta.status === 200) {
                    this.total = res.data.data.total;
                    this.goodList = res.data.data.goods;
                } else {
                    this.$message.warning(res.data.meta.msg);
                }
            });
        },
        //删除商品
        async delGood(row) {
            let res = await delGoods(row.goods_id);
            if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                this.init();
            } else {
                this.$message.error(res.data.meta.msg);
            }
        },
        //添加商品
        addgood() {
            this.$router.push({ name: "addgood" });
        },
        search() {
            this.goodobj.pagenum = 1;
            this.init();
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.goodobj.pagesize = val;
            this.init();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.goodobj.pagenum = val;
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    filters: {
        timefilter
    }
};
</script>
<style lang="less" scoped>

</style>