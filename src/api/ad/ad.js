/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 谁最懂我相关

// 列表
export function adList(query) {
    return axios({
        url: "/review/get_asin_review",
        method: "get",
        params: query
    });
}

// 保存
export function adSave(data, formName, method = "post") {
    var url = formName === "add" ? "/add_asin" : "/add_asin";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function adDelete(data) {
    return axios({
        url: "/review/del_asin",
        method: "get",
        data: data
    });
}
//获取来源数据
export function get_source() {
    return axios({
        url: '/review/get_source',
        method: "get",
    });
}

//导出
export function downloadEX(){
    return axios({
        url:'/review/to_excel',
        method:'get',
        responseType: 'blob'
    })
}