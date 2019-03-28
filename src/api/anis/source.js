import axios from "../../utils/axios";

// 谁最懂我相关

// 新增||修改来源
export function add_source_type(data, formName, method = "post") {
    var url = formName === "add" ? "/review/add_source_type" : "/review/add_source_type";
    return axios({
        url: '/review/add_source_type',
        method: method,
        data:data
    });
}

//获取来源数据
export function get_source() {
    return axios({
        url: '/review/get_source',
        method: "get",
    });
}
