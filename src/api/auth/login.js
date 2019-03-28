/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
// 获取信息
export function userInfo(id) {
    // return {"status":"1","id":1,"username":"admin","avatar":"","authRules":["admin"],"token":"eyJpZHNzIjoiJDJ5JDEwJGNmMVpVb3BxM2lEUUk0bllVZXkxenUzajM0QVJlYmEuS3B4aDZ1MkNkY1J4clF6SE10MTRLIn0=_2018-04-27"}
    return axios({
        url: "/auth/get_oa_user_info",
        method: "GET",
        params: id
    });
}

export function loginName(dataform) {
    return axios({
        url: "/auth/login",
        method: "post",
        data: dataform
    });
}

export function logout() {
    return axios({
        url: "/auth/logout",
        method: "GET",
        // data: { uid, token }
    });
}

export function password(data) {
    return axios({
        url: "/admin/auth/login/password",
        method: "post",
        data: data
    });
}
