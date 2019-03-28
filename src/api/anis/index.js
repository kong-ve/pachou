import axios from "../../utils/axios";

// 谁最懂我相关

// 开始爬取
export function start_review() {
    return axios({
        url: '/review/start_review',
        method: "get"
    });
}

// 显示操作日志
export function show_log() {
    return axios({
        url: '/review/show_log',
        method: "get"
    });
}

// 搜索操作日志
export function select_log(data){
    return axios({
        url:'/review/show_log',
        method:'get',
        params:data
    })
}

// 显示正在进行爬取的ASIN任务
export function show_plan() {
    return axios({
        url: '/review/show_plan',
        method: "get"
    });
}

//anis评论
export function get_comments(id) {
    return axios({
        url: '/review/get_comments',
        method: "get",
        params:id
    });
}
//anis全部评论
export function get_all_comments(id) {
    return axios({
        url: '/review/get_all_comments',
        method: "get",
        params:id
    });
}
//删除ASIN任务
export function del_plan(id){
    console.log(id);
    return axios({
        url:'/review/del_plan',
        method:'get',
        params:id
    })
}

//获取chrome进程pid
export function get_windows_pid(){
    return axios({
        url:'/review/get_windows_pid',
        method:'get',
    })
}

//关闭chrome.exe浏览器进程
export function kill_pid(){
    return axios({
        url:'/review/kill_pid',
        method:'get'
    })
}