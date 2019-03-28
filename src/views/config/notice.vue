    <template>
        <div>
            <!-- <el-table
                v-loading="loading"
                :data="list"
                style="width: 100%;">
                <el-table-column
                    label="ID"
                    prop="id"
                    >
                </el-table-column>
                <el-table-column
                    label="用户"
                    prop="user_name"
                    with="300"
                    >
                </el-table-column>
                <el-table-column
                    label="最后操作时间"
                    prop="last_at"
                    with="300"
                    >
                </el-table-column>
                <el-table-column
                    label="加入时间"
                    prop="hand_at">
                </el-table-column>
                <el-table-column
                    label="商品ID" prop="review_id">
                </el-table-column>
                <el-table-column label="状态" prop="state">
                    <template slot-scope="scope">
                        {{formMap[scope.row.state]}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">查看</el-button>

                    </template>
                </el-table-column>
            </el-table> -->
            <el-row v-for="(o, index) in list" :key="o" :offset="offsetshow(index)">
  <el-col  style="margin-bottom: 3vh">
    <el-card class="box-card" >
        <img :src="o.review.review_asin.thumbnail" class="image">
      <div style="padding: 14px;">
         <span>{{o.title}}</span>
        <div class="bottom clearfix">
          <div class="time">操作用户:{{ o.review.user_name }}</div><br>
           <div class="time"> </div><br>
            <div class="time">商品编号:{{ o.review.asin || o.review.parent_asin }}</div><br>
             <div class="time">尺码:{{ o.review.size }}</div><br>
             <div class="time">来源平台:<el-button type="text" size="small"@click.native="productUrl(o.review.review_asin.url)">{{o.review.review_asin.source.name }}</el-button></div><br>
             <div class="time">颜色:{{o.review.color}}</div><br>
             <el-rate 
                    v-model="o.review.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"></el-rate><br>
             <div class="time">商品管理者:{{o.review.review_asin.add_user_name}}</div><br>
             <div class="time">处理者:{{o.user_name||'暂未处理'}}</div><br>
             <time class="time">评论时间:{{o.review.review_at}}</time><br>
          <el-button type="success"@click.native="handleForm(index, o)" style="float: right;">查看</el-button>
        </div>
      </div>
  <!-- <div slot="header" class="clearfix">
    <span>{{o.title}}</span>
    <el-button style="float: right; padding: 3px 0" type="text"@click.native="handleForm(index, o)">查看</el-button>
  </div>
  <div class="text item" v-text="o.body">
  </div> -->
</el-card>
    <!-- <el-card :body-style="{ padding: '0px' }">
      <div style="padding: 14px;">
        <span>{{o.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ o.body }}</time>
          <el-button type="text" class="button" @click.native="handleForm(scope.$index, scope.row)">查看</el-button>
        </div>
      </div>
    </el-card> -->
  </el-col>
</el-row>
     <el-pagination
                :page-size="query.per_page"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
             <el-dialog
                title="消息详情"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="85%"
                
                top="5vh" style="height: 85%">
                    <el-form :model="dataList" ref="formData">
                         <!-- <el-form-item label="id" prop="id">
                          <el-input v-model="dataList.id"auto-complete="off" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="hand_at" prop="hand_at">
                          <el-input v-model="dataList.hand_at"auto-complete="off" disabled></el-input>
                   </el-form-item>
                  <el-form-item label="last_at" prop="last_at">
                          <el-input v-model="dataList.last_at"auto-complete="off" disabled></el-input>
                   </el-form-item>
                  <el-form-item label="review_id" prop="review_id">
                          <el-input v-model="dataList.review_id"auto-complete="off" disabled></el-input>
                   </el-form-item>
                  <el-form-item label="user_name" prop="user_name">
                    <el-input v-model="dataList.user_name"auto-complete="off" disabled></el-input>
                   </el-form-item>
                  <el-form-item label="state" prop="state">
                          <el-select v-model="dataList.state"auto-complete="off" disabled>
                              <el-option v-for="item in selectList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"></el-option>
                             
                          </el-select>
                    </el-form-item> -->
                         <!-- <el-card v-for="item in dataList.review":key="item">{{item}} </el-card> -->
                      <!--    <el-card class="box-card">
                       <div slot="header" class="clearfix">
                                  <span>商品</span>
                                   </div>
                          <div v-for="(val, key, index) in dataList.review":key="(val, key, index)" class="text item">
                             {{key}}:{{val }}
                                </div>
                             </el-card> -->
                   <!-- <el-card :body-style="{ padding: '0px' }">
      <img :src="dataList.review['review_asin'].thumbnail" class="image">
      <div style="padding: 14px;" v-for="(val, key, index) in dataList.review":key="(val, key, index)">
        <span>{{dataList.review.asin}}</span>
        <div class="bottom clearfix">
          <time class="time">{{key}}:{{ val }}</time> -->
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </el-card> -->
    <el-table
            :data="dataList.review"
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
                label="平台"
                prop="review_asin.source.name"
                with="300"
                :show-overflow-tooltip="true">
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
            <!-- <el-table-column
                label="商品明细"
                prop="field_name"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column> -->
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
                label="简要评论"
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
        </el-table>
        <el-form-item style=" text-align: right;position: absolute;bottom: 1vh;right: 2vh;">
        <el-button type="primary" @click.native="stateChange(dataList.id,3)">解决</el-button>
        <el-button  type="danger" @click.native="stateChange(dataList.id,2)">暂未解决</el-button>
    </el-form-item>
                    </el-form>
</el-dialog>
        </div>
    </template>
    <script>
        import {get_notice,change_notice} from '../../api/config/notice'
        export default {
            data(){
                return {
                    list:[],
                    dataList:[],
                    loading:true,
                    formloading:false,
                    total:100,
                   formMap: {
                0: "未查看",
                1: "已查看",
                2:'暂未解决',
                3:'已完成'
            },
            selectList:[
             {value:'0',label:"未查看"},
                {value:1,label: "已查看"},
                {value:2,label:'暂未解决'},
                {value:3,label:'已完成'}
            ],
                    formVisible: false,
                    query: {
                    title: "",
                    page: 1,
                    per_page: 20
                },
                }
            },
            methods:{
                 handleCurrentChange(val) {
                this.query.page = per_page;
                this.getList();
            },
            productUrl(url){
                window.open(url,'_blank');
            },
            offsetshow(index){
                if(index == 0){
                    return 0;
                }else{
                    let a = index+1;
                    if(a%2 == 0){
                        return 2;
                    }else{
                        return 0;
                    }
                }
            },
            stateChange(id,type){
                let data =  new FormData();
                data.append('id',id);
                data.append('state',type);
                 change_notice(data).then(response=>{
                  this.getList()
                })
            },
            hideForm(){
                this.formVisible = !this.formVisible;
                return true;
            },
            handleForm(index,row){
                let data =  new FormData();
                data.append('id',row.id);
                data.append('state','1');
                change_notice(data).then(response=>{
                    
                    this.formVisible = true;
                    row.state = 1;
                    row.review = new Array(row.review);
                this.dataList = row;
                  this.getList()
                })
                
            },
                getList(){
                    this.loading = true;
                    get_notice(this.query).then(response=>{
                      if(response.state != 1){
                        this.$message.error(response.message);
                        return false;
                      }
                        this.query.page = response.page_data.page;
                        this.query.per_page = response.page_data.per_page;
                        this.total = response.page_data.total;
                        this.list = response.item;
                         this.loading = false;
                    })
                }
            },
             created(){
                this.getList();
            }
        }
    </script>
    <style type="text/scss"lang="scss">
    .time {
    font-size: 13px;
    color: #999;
    padding:.3vh 0 .3vh 0;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 90px;
    display: block;
  }
.el-dialog{
    height:85%
}

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
    </style>