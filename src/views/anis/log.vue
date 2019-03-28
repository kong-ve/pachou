<template>
    <div>
    <el-form :inline="true" :model="query" class="query-form" size="mini">
        <el-form-item class="query-form-item">
            <el-date-picker v-model="query.log_time" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions1"></el-date-picker>
    </el-form-item>
    <el-form-item class="query-form-item">
        <el-select v-model="query.log_type"  placeholder="请选择">
                <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button-group>
            <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
            <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
        </el-button-group>
    </el-form-item>
</el-form>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>日志</span>
</div>
<div v-for="o in list" :key="o" class="text item">
    {{o }}
</div>
</el-card>
</div>
</template>
<script>
    import { show_log,select_log } from "../../api/anis/index";
    export default {
        data(){
            return{
                list:[],
                query: {
                    log_type: "warning",
                    log_time: '' 
                },
                type:[
                {value:'info',label:'info'},
                {value:'warning',label:'warning'},
                {value:'error',label:'error'},
                {value:'debug',label:'debug'},
                {value:'critical',label:'critical'},
                ],
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                  }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
              }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
          }
      }]
  }
}
},
methods: {
    getList(){
        show_log().then(response =>{
          if(response.state != 1){
            this.$message.error(response.message);
            return;
          }

            this.list = response.result;
        })
    },
    onSubmit(){

        select_log(this.query).then(response =>{
          if(response.state != 1){
            this.$message.error(response.message);
            return;
          }
            this.list = response.result;
        })
    }
},
mounted() {},
created() {
        // 加载表格数据
        this.getList();
    }
}
</script>