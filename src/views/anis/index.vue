<template>
	<div>
	<el-button type="primary" @click="onstart" size="medium" v-if="showstart">开始爬虫</el-button>
	<el-button type="primary" @click="onstop" size="medium" v-if="showstop">停止</el-button>
	<div v-if="showplan" class="showplan">
		<span  v-for="item in list_window" v-text="item"></span>
	</div>
	<el-table
            v-loading="loading"
            :data="list"
            style="width: 100%;">
            <el-table-column
                label="ID"
                prop="0"
                fixed>
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="1"
                with="300"
                :show-overflow-tooltip="true"
                fixed>
            </el-table-column>
            <el-table-column
                label="任务序号"
                prop="2"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

</div>
</template>
<script>
	import { start_review, show_log, show_plan, del_plan,get_windows_pid,kill_pid } from "../../api/anis/index";
	export default {
		data(){
			return{
				list:[],
				loading: false,
				deleteLoading:false,
				showstart:true,
				showstop:false,
				showplan:true,
				list_window:[]
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
				this.loading = true;
				show_plan().then(response =>{
                    
					this.loading = false;
                    if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
					this.list = response.item;
				})
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
        this.getwindows();
       }
	}
</script>
<style type="text/scss" lang="scss">
    .showplan{
        span{
            color:#000;
            margin-right:5px
        }
    }
</style>