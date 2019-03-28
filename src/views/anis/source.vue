<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.title" placeholder="查询条件"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">新增</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="loading"
            :data="list"
            :stripe="true"
            :border="true"
            style="width: 100%;">
                        <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                      </el-table-column>
                      <el-table-column
                      prop="name"
                      label="来源名称"
                      width="180">
                    </el-table-column>
                     <el-table-column
                  prop="short"
                  label="名称简写"
                  width="180">
                </el-table-column>
                    <el-table-column
                    prop="url"
                    label="来源站点网址"
                    width="180">
                    <template slot-scope="scope">
                    <a  :href="scope.row.url" v-text="scope.row.url" target=" _blank"/>
                </template>
                  </el-table-column>
                 
                <el-table-column
                prop="note"
                label="备注"
                width="180">
              </el-table-column>
              <el-table-column
              prop="sort"
              label="排序"
              width="180"
              ></el-table-column>
              <el-table-column
              prop="enable"
              label="是否启用">
              <template slot-scope="scope">
                 <el-switch
                 v-model="scope.row.enable"
                 active-color="#13ce66"
                 inactive-color="#ff4949"
                 active-value="1"
                 auto-complete="off"
                 inactive-value="0"
                 @click.native="ChangeForm(scope.$index, scope.row)">
             </el-switch>
              </template>
         </el-table-column>
             <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button type="text" size="small" @click.native="handleDel(scope.$index, scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
               
          </el-table>
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
                 <el-form-item label="来源名称" prop="name">
                    <el-input v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称简写" prop="short">
                    <el-input v-model="formData.short" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源站点网址" prop="url">
                    <el-input v-model="formData.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input type="textarea" v-model="formData.note" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formData.sort" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enable">
                    <el-switch
                    v-model="formData.enable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    auto-complete="off"
                    inactive-value="0">
                </el-switch>
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
import { get_source, add_source_type } from "../../api/anis/source";

import Upload from "../../components/File/Upload.vue";
const formJson = {
    id: "",
    name: "",
    url: "",
    short: "",
    note: "",
    sort:'',
    enable: "",
};
export default {
    data() {
        return {
            query: {
                title: "",
                page: 1
                // limit: 20
            },
            channelListInput: "",
            androidVersionListInput: "",
            iosVersionListInput: "",
            list: [],
            total: 0,
            loading: true,
            index: null,
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
                        required: false,
                        message: "id",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: false,
                        message: "来源名称",
                        trigger: "blur"
                    }
                ],
                url:[
                {
                    required: false,
                     message: "来源站点网址",
                        trigger: "blur"
                }
                ],
                short:[
                {
                    required: false,
                     message: "名称简写",
                        trigger: "blur"
                }
                ],
                 note:[
                {
                    required: false,
                     message: "备注",
                        trigger: "blur"
                }
                ],
                sort:[
                {
                    required: false,
                    message:'排序',
                    trigger:'blur'
                }
                ],
                enable:[
                {
                    required: false,
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
                title: "",
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
        ChangeForm(index,row){
            let formData = new FormData();
                    for(var key in row){
                        formData.append(key,row[key]);
                    }
                    // return false;
                    add_source_type(formData,'edit')
                        .then(response => {
                            this.formLoading = false;
                            if (response.status != 1) {
                                this.$message.error(response.message);
                                return false;
                            }
                            this.$message.success("操作成功");
                            this.formVisible = false;
                            this.getList();
                        })
                        .catch(() => {
                            this.formLoading = false;
                        });
        },
        getList() {
            this.loading = true;
            get_source(this.query)
                .then(response => {
                    this.loading = false;
                    if(response.state != 1){
                        this.$message.error(response.message);
                        return;
                    }
                    if(response.item.length>0){
                        for(var o=0;o<response.item.length;o++){
                       response.item[o].enable = (response.item[o].enable?"1":"0");
                    }
                    console.log(response.item);
                    this.list = response.item || [];
                    }
                    
                    if(response.item.length == 0){
                        this.$message.error(response.message);
                    }
                    // this.total = response.item.length || 0;
                })
                .catch(() => {
                    this.loading = false;
                    this.list = [];
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
                    console.log(valid);
                    this.formLoading = true;
                    let data = Object.assign({}, this.formData);
                    console.log(data);
                    let formData = new FormData();
                    for(var key in data){
                        formData.append(key,data[key]);
                    }
                    // return false;
                    add_source_type(formData, this.formName)
                        .then(response => {
                            this.formLoading = false;
                            if (response.state != 1) {
                                this.$message.error(response.message);
                                return false;
                            }
                            this.$message.success("操作成功");
                            this.formVisible = false;
                            this.getList();
                        })
                        .catch(() => {
                            this.formLoading = false;
                        });
                }
            });
        },
        // 删除
        handleDel(index, row) {
            if (row.id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        let para = { id: row.id };
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
        this.getList();
    }
};
</script>

<style type="text/scss" lang="scss">
</style>
