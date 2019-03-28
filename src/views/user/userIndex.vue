<template>
	<div>
		<el-form :model="formData"  ref="dataForm":v-loading="loading">
                      
                
                 <el-form-item label="部门" prop="department_id">
                    <div class="block">
                    	<span class="demonstration">部门</span>
                    	<el-cascader
                    	expand-trigger="hover"
                    	:options="list"
                    	v-model="selectedOptions"
                    	@change="handleItemChange"
                    	>
                    	</el-cascader>
                    </div>
                </el-form-item>
                
                <el-form-item>
                <el-button type="primary" @click.native="saveInfo()">保存</el-button>
            </el-form-item>
            </el-form>
	</div>
</template>
<script>
	import { dingtalkInfo,getInfoList } from "../../api/user/index";
	import { getAdminId } from "../../utils/auth";
	function getCascaderObj(val,opt) {
            return val.map(function (value, index, array) {
                for (var itm of opt) {
                    if (itm.value == value) { opt = itm.children; return itm; }
                }
                return null;
            });
        }
	export default{
		data(){
			return{
				list:[],
				loading:true,
				selectedOptions:[],
				userId:getAdminId(),
				vals:[]
			}
		},
		methods: {
			getList(){
				getInfoList().then(response=>{
					if(response.state != 1){
						this.$message.error(response.message);
						return;
					}
					this.list = response.data;
				})
			},
			handleItemChange() {
                    this.vals=getCascaderObj(this.selectedOptions, this.list);
                },
		saveInfo(){debugger
			console.log(this.vals);
			let data =new FormData();

			data.append('department_id',this.vals[0].value);
			data.append('department_name',this.vals[0].label);
			data.append('user_id',this.vals[1].value);
			data.append('user_name',this.vals[1].label);
			data.append('oid',this.userId);
			dingtalkInfo(data).then(response=>{
				if(response.state != 1){
					this.$message.error(response.message);
					return;
				}
				this.$message.success(response.message);
			})
		},
	},
		created(){
			this.getList();
		}
	}
</script>