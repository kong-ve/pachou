<template>
	<div>
         <el-form :inline="true" :model="param" class="jqery-form" size="mini">
        <el-form-item label="查询条件">
            <el-input v-model="param.q" placeholder="查询条件"></el-input>
    </el-form-item>
    <el-form-item label="asin名称">
            <el-input v-model="param.asin" placeholder="asin名称"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button-group>
            <el-button type="primary" icon="el-icon-refresh" @click="rgetList"></el-button>
            <el-button type="primary" icon="search" @click="getList">查询</el-button>
        </el-button-group>
    </el-form-item>
</el-form>
	<el-table
            v-loading="loading"
            :data="list"
            style="width: 100%;">
            <el-table-column
                label="id"
                prop="id"
                fixed>
            </el-table-column>
            <el-table-column
                label="商品编码"
                prop="asin"
                with="300"
                :show-overflow-tooltip="true"
                fixed>
            </el-table-column>
            <el-table-column
                label="父级商品码"
                prop="parent_asin"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
             <el-table-column
                label="图片"
                prop="url"
                with="300"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <img :src="scope.row.review_asin.thumbnail" width="80" />
                </template>
            </el-table-column>
            <el-table-column
                label="颜色"
                prop="color"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="尺码"
                prop="size"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="标题"
                prop="asin"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
           
            <el-table-column
                label="星级"
                prop="stars"
                with="300"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-rate 
                    v-model="scope.row.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                        
                    </el-rate>
                </template>
            </el-table-column>
            <el-table-column  prop="verified" label="是否真实评论" :show-overflow-tooltip="true">
           <template slot-scope="scope">
            <el-switch
            v-model="scope.row.verified"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"></el-switch>
        </template>
    </el-table-column>
     <el-table-column prop="helpful" label="点赞数" width="180" ></el-table-column>
    <el-table-column prop="review_url" label="评论地址">
             <template slot-scope="scope">
                <a  :href="'https://'+scope.row.review_asin.source.url+scope.row.review_url" target=" _blank">查看</a>
            </template>
            </el-table-column>
            <el-table-column
                label="评论"
                prop="note_short"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="评论日期"
                prop="review_at"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
             <el-table-column
                label="评论人"
                prop="user_name"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>

           <!--  <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <el-pagination
  :page-size="param.per_page"
  :pager-count="11"
  layout="prev, pager, next"
  :total="param.total" :value="param.page"
      @current-change="handleCurrentChange"
      @current-page="handleCurrentChange">
</el-pagination>
</div>
</template>
<script>
	import { get_all_comments } from "../../api/anis/index";
	export default {
		data(){
			return{
				list:[],
				loading: false,
                id:this.$route.query.id,
               
                param:{
                    q:'',
                    asin:'',
                     page:1,
                per_page: 30,
                total: 100
                }
			}
		},
		methods: {
            handleCurrentChange(val){
                this.loading = true;
                this.param.page = val;
                let arr = this.param;
                get_all_comments(arr).then(response =>{
                    this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
                    this.list = response.item;
                    this.param.page = response.page_data.page||1
                    this.param.per_page = response.page_data.per_page||30;
                    this.param.total = response.page_data.total||100;

                })
            },
			getList(){
                console.log(this.$route.query.id)
				this.loading = true;
                let arr = this.param;
				get_all_comments(arr).then(response =>{
					this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
					this.list = response.item;
                    this.param.page = response.page_data.page||1
                    this.param.per_page = response.page_data.per_page||30;
                    this.param.total = response.page_data.total||100;


				})
			},
            rgetList(){
                    this.loading = true;
                this.param.q = '';
                 this.param.asin = '';
                let arr = this.param;
                get_all_comments(arr).then(response =>{
                    this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
                    this.list = response.item;
                    this.param.page = response.page_data.page||1
                    this.param.per_page = response.page_data.per_page||30;
                    this.param.total = response.page_data.total||100;


                })
            },
            back_load(){
                this.$router.go(-1);
            },
		},
		mounted() {},
		created() {
        // 加载表格数据
        this.getList();
       }
	}
</script>
<style type="text/scss" lang="scss">

</style>