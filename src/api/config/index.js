import axios from "../../utils/axios";

// 修改系统配置
export function change_config(query) {
    return axios({
        url: "/review/change_config",
        method: "post",
        data: query
    });
}

//获取系统配置
export function get_config() {
	return axios({
		url:'/review/get_config',
		method:'get',
	})
}