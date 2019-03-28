<template>
	<div>
        <el-button type="primary" size="medium" @click="back_load" >返回</el-button>
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
            <el-table-column prop="review_url" label="评论地址">
             <template slot-scope="scope">
               <a  :href="'https://'+scope.row.review_asin.source.url+scope.row.review_url" target=" _blank">查看</a>
            </template>
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
        <el-table-column  prop="verified" label="是否真实评论">
           <template slot-scope="scope">
            <el-switch
            v-model="scope.row.verified"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"></el-switch>
             </template>
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
           <!--  <el-table-column
                label="商品明细"
                prop="field_name"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column> -->
            <el-table-column prop="helpful" label="点赞数" width="180" ></el-table-column>
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
            <el-table-column
                label="短评论"
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
                label="评论用户"
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
	import { get_comments } from "../../api/anis/index";
	export default {
		data(){
			return{
				list:[],
				loading: false,
				deleteLoading:false,
				showstart:true,
				showstop:false,
				showplan:true,
                id:this.$route.query.id,
				list_window:[],
                param:{
                    'asin_id':'',
                    q:'',
                    asin:'',
                     page:1,
                per_page: 0,
                total: 0
                }
			}
		},
		methods: {
			onstart:function () {
				this.loading = true;
				start_review().then(response =>{
					this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
					this.$message(response.message);
					this.getList();
					this.getwindows();
				})
			},
            handleCurrentChange(val){
                this.loading = true;
                this.param.page = val;
                this.param['asin_id'] = this.id;
                let arr = this.param;
                getList(arr).then(response =>{
                    this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
                    this.list = response.item;
                    this.param.page = response.page_data.page||1
                    this.param.per_page = response.page_data.per_page||1;
                    this.param.total = response.page_data.total||0;

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
                })
            },
			getwindows(){
				this.showstart = false;
				this.showstop = true;
				get_windows_pid().then(response=>{
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
					this.list_window = response.item||[];
					this.showstop = true;
                    if(this.list_window.length == 0){
                        this.showstart = true;
                this.showstop = false;
                this.showplan = false;
                    }
				})
			},
			onstop(){
                this.loading = true;
				kill_pid().then(response=>{
					if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
                if(this.list_window.length == 0){
                    this.showstart = true;
                this.showstop = false;
                this.showplan = false;
                }
				this.loading = false;
				})
			},
			getList(){
                console.log(this.$route.query.id)
				this.loading = true;
                 this.param['asin_id'] = this.id;
                 let arr = this.param;
				get_comments(arr).then(response =>{
					this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
					this.list = response.item;
                    this.param.page = response.page_data.page||1
                    this.param.per_page = response.page_data.per_page||1;
                    this.param.total = response.page_data.total||0;

				})
			},
            back_load(){
                this.$router.go(-1);
            },
			 handleDel(index, row) {
			 	console.log(row,index);
            if (row.id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "error"
                })
                    .then((i) => {
                    	
                        let para = { id: row.id };
                        this.deleteLoading = true;
                        del_plan(para)
                            .then(response => {
                                this.deleteLoading = false;
                                if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
                                this.$message(response.message);
                                // 刷新数据
                                this.list.splice(index, 1);
                            })
                            .catch(() => {
                                this.deleteLoading = false;
                                 this.$message("删除失败");
                            });
                    })
                    .catch((i) => {
                    	if(i == false)
                        this.$message.info("取消删除");
                    });
            }
        },
		},
		mounted() {},
		created() {
        // 加载表格数据
        this.getList();
        // this.getwindows();
       }
	}
</script>
<style type="text/scss" lang="scss">

</style>