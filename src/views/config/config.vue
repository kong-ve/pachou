<template>
    <div>
        <el-form :model="formData"  ref="dataForm":v-loading="loading">
                      <el-form-item label="通知邮箱" prop="email_account">
                    <el-input v-model="formData.email_account"></el-input>
                </el-form-item>
                <el-form-item label="通知的最低分数" prop="star_notice">
                     <el-input-number v-model="formData.star_notice":min="0":max="5"></el-input-number>
                </el-form-item>
                 <el-form-item label="数据校验模式" prop="check_data_model">
                    <el-switch
                 v-model="formData.check_data_model"
                 active-color="#13ce66"
                 inactive-color="#ff4949"
                 active-value="true"
                 auto-complete="off"
                 inactive-value="false"
                 >
             </el-switch>
                </el-form-item>
                
                <el-form-item>
                <el-button type="primary" @click.native="changeConfig()">保存</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
    import { change_config,get_config } from "../../api/config/index";
    const formJson = {
    email_account: "",
    check_data_model: 'false',
    star_notice:0

};
    export default {
    data() {
        return{
         formData:formJson,
         loading:true,
         formLoading:true
     }
    },
    methods: {
        getConfig(){
            
            this.loading = true;
            get_config().then(response=>{
                this.formData = Object.assign({}, response.item);
                this.loading = false;
            })
        },
        changeConfig(){

            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    var form1 = new FormData();
                    // let data = Object.assign(form1, this.formData);
                    for (var key in this.formData){
                        form1.append(key,this.formData[key]);
                    }
                    change_config(form1)
                        .then(response => {
                            this.formLoading = false;
                            if (response.state != 1) {
                                this.$message.error(response.message);
                                return false;
                            }
                            this.$message.success(response.message);
                            this.getConfig();
                        })
                        
                }
            });
        }
    },
    mounted() {},
    created() {
        this.getConfig();
    }
}
</script>