<template>
    <div class="home">
        <el-container class="el-container">
            <el-aside width="200px" class="el-aside">
                <img src="../assets/logo.png" alt="" class="logo">
                <el-menu
                    :router="true"
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :unique-opened='true'
                >
                    <el-submenu :index="first.path" v-for="first in menuList" :key="first.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{first.authName}}</span>
                        </template>
                        <el-menu-item :index="'/home/'+second.path"  v-for="second in first.children" :key="second.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{second.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="/home/roles">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>角色列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/home/rights">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>权限列表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="/home/lists">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>商品列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/home/params">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>分类参数</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/home/categories">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>商品分类</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="/home/orders">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>订单列表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                     <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="/home/data">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>数据报表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="el-header">
                    <span class="toggle-btn myicon myicon-menu"></span>
                    <p class="system-title">后台管理系统</p>
                    <a href="javascript" class="welcome">退出</a>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {rightmenus} from "../api/rights.js"
export default {
    data(){
        return{
            menuList:[]
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            let res = await rightmenus()
            console.log(res)
            if(res.data.meta.status ===200){
                this.menuList = res.data.data
            }
        }
    }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
  }
}
</style>