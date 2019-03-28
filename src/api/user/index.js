import axios from "../../utils/axios";

//修改钉钉相关信息
export function dingtalkInfo(id) {
return axios({
	url:'/users/update_dingtalk_info',
	method:'POST',
	data:id
})
}

//获取部门
export function getInfoList(){
	return axios({
		url:'/users/get_dingtalk_department',
		method:'get'
	})
}