<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.q" placeholder="查询条件"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">新增</el-button>
                    <el-button type="primary" @click="downloadCVN">导出</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
        v-loading="loading"
        :data="list"
        :stripe="true"
        :border="true"
        style="width: 100%;">
        <el-table-column prop="id" label="id"width="100"></el-table-column>
        <el-table-column prop="name"label="ASIN名称" width="100"></el-table-column>
        <el-table-column prop="thumbnail" label="图片" width="100">
            <template slot-scope="scope">
                <img  :src="scope.row.thumbnail" :title="scope.row.name" />
            </template>
        </el-table-column>
        <el-table-column prop="url" label="ASIN的URL地址" width="100">
            <template slot-scope="scope">
                <a  :href="scope.row.url" v-text="scope.row.url" target=" _blank"/>
            </template>
        </el-table-column>
        <el-table-column prop="source.name" label="来源" width="100"></el-table-column>
        <el-table-column prop="review_num" label="评论数量" width="100"></el-table-column>
        <el-table-column prop="screen_num" label="截屏数" width="100" ></el-table-column>

        <el-table-column prop="enable" label="是否启用" width="100">
            <template slot-scope="scope">
             <el-switch
             v-model="scope.row.enable"
             active-color="#13ce66"
             inactive-color="#ff4949"
             active-value="1"
             inactive-value="0" @change="changeEnable(scope.$index, scope.row)">
         </el-switch>
     </template>
 </el-table-column>
 
<el-table-column prop="last_time" label="最后爬取的时间" width="100"
></el-table-column>
<el-table-column
prop="create_at"
label="创建时间"
width="100"
></el-table-column>
<el-table-colum
label="创建人"
prop="add_user_name"
with="300"
:show-overflow-tooltip="true"
>                
</el-table-colum>
<el-table-column
prop="count"
label="爬取累计次数"
width="100"
></el-table-column>

<el-table-column
label="操作"
fixed="right"
width="150">
<template slot-scope="scope">
    <el-button type="text" size="small" @click.native="common_click(scope.$index, scope.row)">评论</el-button>
    <!-- <router-link :to="{path:'/common',query:{id:scope.row.id}}">查看详情</router-link> -->
    <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button>
    <el-button type="text" size="small" @click.native="handleDel(scope.$index, scope.row)">删除</el-button>

</template>
</el-table-column>

</el-table>
<el-pagination
:page-size="per_page"
:pager-count="11"
layout="prev, pager, next"
:total="total" :value="query.page"
@current-change="handleCurrentChange"
@current-page="handleCurrentChange">
</el-pagination>
<el-dialog
:title="formMap[formName]"
:visible.sync="formVisible"
:before-close="hideForm"
width="85%"
top="5vh">
<el-form :model="formData" :rules="formRules" ref="dataForm">
  <el-form-item label="id" prop="id">
    <el-input v-model="formData.id" auto-complete="off" disabled></el-input>
</el-form-item>
<el-form-item label="ASIN名称" prop="name">
    <el-input v-model="formData.name" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="ASIN的URL地址" prop="url">
    <el-input v-model="formData.url" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="图片地址" prop="thumbnail">
    <el-input v-model="formData.thumbnail" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="平台" prop="source">
    <el-select v-model="formData.source_id||''" placeholder="请选择" auto-complete="off">
        <el-option
        v-for="item in source"
        :key="item.id"
        :label="item.name"
        :value="item.id">
    </el-option>
</el-select>
<!-- <el-input v-model="formData.source" auto-complete="off"></el-input> -->
</el-form-item>
<el-form-item label="评论数量" prop="review_num">
    <el-input-number v-model="formData.review_num" auto-complete="off"></el-input-number>
</el-form-item>
<el-form-item label="截屏数" prop="screen_num">
    <el-input-number v-model="formData.screen_num" auto-complete="off"></el-input-number>
</el-form-item>
<el-form-item label="是否启用" prop="enable">
    <el-switch
    v-model="formData.enable"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="100"
    auto-complete="off"
    inactive-value="0">
</el-switch>
</el-form-item>
<el-form-item label="最后爬取的时间" prop="last_time">
   <el-date-picker type="date" placeholder="选择日期" v-model="formData.last_time" style="width: 100%;"></el-date-picker>
</el-form-item>
<el-form-item label="创建时间" prop="create_at">
    <el-date-picker type="date" placeholder="选择日期" v-model="formData.create_at" style="width: 100%;"></el-date-picker>
</el-form-item>
<el-form-item label="创建人" prop="add_user_name">
    <el-input v-model="formData.add_user_name" auto-complete="off"></el-input>
</el-form-item>                
<el-form-item label="爬取累计次数" prop="count">
    <el-input-number v-model="formData.count" auto-complete="off"></el-input-number>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click.native="hideForm">取消</el-button>
    <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
</div>
</el-dialog>

</div>
</template>
<script>
    import { adList, adSave, adDelete,get_source,downloadEX } from "../../api/ad/ad";
    import Upload from "../../components/File/Upload.vue";
import { getToken } from "../../utils/auth"; // 验权
import axios from "axios";
const formJson = {
    id: "",
    name: "",
    url: "",
    source_id: "",
    source: "",
    enable: "",
    count:'',
    create_at:'',
    last_time:'',
    screen_num:'',
    review_num:'',
    add_user_name:'',

};
export default {
    data() {
        return {
            query: {
                q: "",
                page:1
                
            },
            per_page: 30,
            total: 100,
            channelListInput: "",
            androidVersionListInput: "",
            iosVersionListInput: "",
            list: [],
            total: 0,
            loading: true,
            index: null,
            source:[],
            formName: null,
            formMap: {
                add: "新增",
                edit: "编辑"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {
                id: [
                {
                    required: true,
                    message: "id",
                    trigger: "blur"
                }
                ],
                name: [
                {
                    required: true,
                    message: "ASIN名称",
                    trigger: "blur"
                }
                ],
                url:[
                {
                    required:true,
                    message: "ASIN的URL地址",
                    trigger: "blur"
                }
                ],
                thumbnail:[
                {
                    required:true,
                    message:'图片地址',
                    trigger:'blur'
                }
                ],
                source_id:[
                {
                    required:true,
                    message: "来源id",
                    trigger: "blur"
                }
                ],
                add_user_name:[
                {
                    required:true,
                    message: "创建人",
                    trigger: "blur"
                }
                ],
                source:[
                {
                    required:true,
                    message: "来源",
                    trigger: "blur"
                }
                ],
                last_time:[
                {
                    required:true,
                    message: "最后爬取的时间",
                    trigger: "blur"
                }
                ],
                create_at:[
                {
                    required:true,
                    message: "创建时间",
                    trigger: "blur"
                }
                ],
                count:[
                {
                    required:true,
                    message: "爬取累计次数",
                    trigger: "blur"
                }
                ],
                review_num:[
                {
                    required:true,
                    message: "评论数量",
                    trigger: "blur"
                }
                ],
                screen_num:[
                {
                    required:true,
                    message: "截屏数",
                    trigger: "blur"
                }
                ],
                enable:[
                {
                    required:true,
                    message: "是否启用",
                    trigger: "blur"
                }
                ],
            },
            deleteLoading: false
        };
    },
    components: {
        Upload
    },
    methods: {
        onReset() {
            this.$router.push({
                path: ""
            });
            this.query = {
                q: "",
                page: 1
                // limit: 20
            };
            this.getList();
        },
        onSubmit() {
            this.$router.push({
                path: "",
                query: this.query
            });
            this.getList();
        },
        handleSizeChange(val) {
            // this.query.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.query.page = val;
            this.getList();
        },
        changeEnable(index,row){debugger
             let data = Object.assign({}, row);
             adSave(data, 'edit')
                    .then(response => {
                        this.formLoading = false;
                        if (response.state!=1) {
                            this.$message.error(response.message);
                            return false;
                        }
                        this.$message.success("操作成功");
                        this.formVisible = false;
                        if (this.formName === "add") {
                                // 向头部添加数据
                                data.ad_id = response.data.ad_id;
                                this.list.unshift(data);
                            } else {
                                this.list.splice(this.index, 1, data);
                            }
                        })
                    .catch(() => {
                        this.formLoading = false;
                    });
        },
        //导出
        downloadCVN(){
            downloadEX().then(response=>{
                let blob = new Blob([response], {type: "application/vnd.ms-excel"});
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob);
                　　downloadElement.href = href;
                　　downloadElement.download = new Date().getTime()+'.xlsx';
                　　document.body.appendChild(downloadElement);
                　　downloadElement.click(); 
                　　document.body.removeChild(downloadElement);
                　　window.URL.revokeObjectURL(href);
                // console.log(JSON.stringify(blob));
            });
            // window.open('http://192.168.1.21:81/review/to_excel?token='+getToken());
        },
        getList() {
            this.loading = true;
            adList(this.query)
            .then(response => {
                if(response.state != 1){
                    this.$message.error(response.message);
                    this.loading = false;
                    this.list = [];
                    this.query.page = 1
                    this.per_page = 30;
                    this.total = 0;
                    return;
                }
                this.loading = false;
                this.list = response.item || [];
                this.query.page = response.page.page||1
                this.per_page = response.page.per_page||30;
                this.total = response.page.total||100;
            })
            .catch(() => {
                this.loading = false;
                this.list = [];
                this.query.page = 1
                this.per_page = 30;
                this.total = 0;
            });
        },
        // 刷新表单
        resetForm() {
            if (this.$refs["dataForm"]) {
                // 清空字段
                this.$refs["dataForm"].resetFields();
                // 清空验证信息表单
                this.$refs["dataForm"].clearValidate();
            }
        },
         // 隐藏表单
         hideForm() {
            // 更改值
            this.formVisible = !this.formVisible;
            return true;
        },
        // 显示表单
        handleForm(index, row) {
            this.formVisible = true;
            // 刷新表单
            this.resetForm();
            this.formData = JSON.parse(JSON.stringify(formJson));
            if (row !== null) {
                this.formData = Object.assign({}, row);
            }
            this.formName = "add";
            if (index !== null) {
                this.index = index;
                this.formName = "edit";
            }
        },
        formSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    let data = Object.assign({}, this.formData);
                    adSave(data, this.formName)
                    .then(response => {
                        this.formLoading = false;
                        if (response.state!=1) {
                            this.$message.error(response.message);
                            return false;
                        }
                        this.$message.success("操作成功");
                        this.formVisible = false;
                        if (this.formName === "add") {
                                // 向头部添加数据
                                data.ad_id = response.data.ad_id;
                                this.list.unshift(data);
                            } else {
                                this.list.splice(this.index, 1, data);
                            }
                        })
                    .catch(() => {
                        this.formLoading = false;
                    });
                }
            });
        },
        // 删除
        handleDel(index, row) {
            if (row.ad_id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                .then(() => {
                    let para = { ad_id: row.ad_id };
                    this.deleteLoading = true;
                    adDelete(para)
                    .then(response => {
                        this.deleteLoading = false;
                        if (response.state != 1) {
                            this.$message.error(response.message);
                            return false;
                        }
                        this.$message("删除成功");
                                // 刷新数据
                                this.list.splice(index, 1);
                            })
                    .catch(() => {
                        this.deleteLoading = false;
                    });
                })
                .catch(() => {
                    this.$message.info("取消删除");
                });
            }
        },
        common_click(index,row){
            this.$router.push({
              path: '/common',
              query: {
                id: row.id
            }
        })
        },
        clck(row){
            window.open(row)
        },
        getSource(){
            get_source().then(response=>{
                if(response.state == 1){
                    this.source = response.item;
                }else{
                    this.$.message.error(this.$message.error(response.message))
                    return;
                }
            })
        },
        onSelectPic(filePath, filePathUrl) {
            this.formData.pic = filePath;
            this.formData.pic_url = filePathUrl;
        }
    },
    // filters: {
    //     statusFilterType(status) {
    //         const statusMap = {
    //             0: "gray",
    //             1: "success"
    //         };
    //         return statusMap[status];
    //     },
    //     statusFilterName(status) {
    //         const statusMap = {
    //             0: "禁用",
    //             1: "正常"
    //         };
    //         return statusMap[status];
    //     }
    // },
    mounted() {},
    created() {
        // 将参数拷贝进查询对象
        let query = this.$route.query;
        this.query = Object.assign(this.query, query);
        // this.query.limit = parseInt(this.query.limit);
        // 加载表格数据
        this.getSource();
        this.getList();
    }
};
</script>

<style type="text/scss" lang="scss">
.el-dialog {
    height: auto !important;
}
</style>
