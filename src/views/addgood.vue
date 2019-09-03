<template>
    <div class="addgood">
        <el-breadcrumb separator=">" style="line-height:45px ;font-size:18px ">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 步骤条 -->
        <el-steps :active="activeName-0" finish-status="success" style="margin:20px 0">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>
        <!-- 主体内容 -->
        <el-card class="box-card">
            <el-tabs
                v-model="activeName"
                tab-position="left"
                @tab-click="tabs"
                :before-leave="beforeLeave"
            >
                <el-tab-pane label="基本信息" name="0">
                    <el-form ref="form" :model="goodsform" label-width="120px">
                        <el-form-item label="商品名称">
                            <el-input v-model="goodsform.goods_name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="goodsform.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="goodsform.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="goodsform.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader
                                :options="cate"
                                change-on-select
                                :props="defaultProps"
                                v-model="goodsform.goods_cat"
                            ></el-cascader>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <div v-for="item in attrValues" :key="item.attr_id">
                        <span
                            style="float:left ; padding-top:17px;padding-right:20px;"
                        >{{item.attr_name}}:</span>
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox
                                :label="arr"
                                v-for="(arr,index) in item.attr_vals"
                                :key="index"
                                border
                                style="margin:5px"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <el-form ref="form" label-width="150px">
                        <el-form-item
                            :label="item.attr_name"
                            v-for="item in attrlist"
                            :key="item.attr_id"
                        >
                            <el-input v-model="item.attr_vals" readonly></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <el-upload
                        class="upload-demo"
                        :headers="getToken()"
                        action="http://localhost:8888/api/private/v1/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :file-list="fileList"
                        list-type="picture"
                        accept="image/*"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <quillEditor v-model="goodsform.goods_introduce"></quillEditor>
                </el-tab-pane>
            </el-tabs>
            <div class="footer" style="text-align:center">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="addCate">添加</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { catelists, addcate } from "@/api/category.js";
import { addGoods ,editGoods} from "@/api/goods.js";
export default {
    data() {
        return {
            attrlist: [],
            attrValues: [],
            fileList: [],
            activeName: 0,
            goodsform: {
                goods_name: "",
                goods_cat: "",
                goods_price: "",
                goods_number: "",
                goods_weight: "",
                goods_introduce: "",
                pics: [],
                attrs: []
            },
            cate: [],
            defaultProps: {
                label: "cat_name",
                value: "cat_id",
                children: "children"
            }
        };
    },
    methods: {
        beforeLeave(activeName, oldActiveName) {
            if (activeName === "1" || activeName === "2") {
                if (this.goodsform.goods_cat.length !== 3) {
                    this.$message.warning("请先选择分类");
                    this.activeName = "0";
                    return false;
                }
            }
        },
        tabs() {
            if (this.activeName === "1") {
                addcate(
                    this.goodsform.goods_cat[
                        this.goodsform.goods_cat.length - 1
                    ],
                    "many"
                ).then(res => {
                    this.attrValues = res.data.data;
                    this.attrValues.forEach((e, i) => {
                        this.attrValues[i].attr_vals = e.attr_vals.split(",");
                    });
                });
            } else if (this.activeName === "2") {
                addcate(
                    this.goodsform.goods_cat[
                        this.goodsform.goods_cat.length - 1
                    ],
                    "only"
                ).then(res => {
                    console.log(res);
                    this.attrlist = res.data.data;
                });
            }
        },
        init() {
            catelists(3).then(res => {
                this.cate = res.data.data;
            });
        },
        async addCate() {
            this.attrValues.forEach((e, i) => {
                // console.log(e.attr_vals.split(","))
                e.attr_vals.forEach(e1 => {
                    this.goodsform.attrs.push({
                        attr_id: e.attr_id,
                        attr_value: e1
                    });
                });
            });
            this.goodsform.goods_cat = this.goodsform.goods_cat.join(",");
            console.log(this.goodsform);
            let res = await addGoods(this.goodsform);
            console.log(res);
            if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg);
                this.$router.push({ name: "goodlist" });
            } else {
                this.$message.error(res.data.meta.msg);
            }
        },
        cancel() {
            this.$router.push({ name: "goodlist" });
        },
        beforeUpload(file) {
            if (file.type.indexOf("image/") !== 0) {
                this.$message.warning("请输入正确 的格式图片");
                return false;
            }
        },
        handleRemove(file, fileList) {
            // console.log(file)
            if (file.response.meta.status === 200) {
                this.goodsform.pics.forEach((item, index) => {
                    if (item.pic === file.response.data.tmp_path) {
                        this.goodsform.pics.splice(index, 1);
                    }
                });
            }
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleSuccess(file) {
            if (file.meta.status === 200) {
                this.goodsform.pics.push({ pic: file.data.tmp_path });
            }
        },
        getToken() {
            let token = localStorage.getItem("login_info");
            return { Authorization: token };
        }
    },
    mounted() {
        this.init();
        editGoods(this.$route.params.id)
        .then(res =>{
            console.log(res)
            if(res.data.meta.status ===200){
                res.data.data.goods_cat = res.data.data.goods_cat.split(',')
                res.data.data.pics.forEach(e =>{
                     this.fileList.push({url:e.pics_big_url})
                })
                this.goodsform = res.data.data
                console.log(this.goodsform)
            }
        })
    },
    components: {
        quillEditor
    }
};
</script>
<style lang="less" scoped>
</style>