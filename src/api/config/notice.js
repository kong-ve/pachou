import axios from "../../utils/axios";

// 修改系统配置
export function change_notice(query) {
    return axios({
        url: "/review/update_notice",
        method: "post",
        data: query
    });
}

//获取系统配置
export function get_notice(query) {
	return axios({
		url:'/review/get_notice',
		method:'get',
		params:query
	})
}