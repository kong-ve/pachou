import axios from "../../utils/axios";

// 谁最懂我相关



//获取每日统计数据
export function get_progress() {
    return axios({
        url: '/review/get_progress',
        method: "get",
    });
}
