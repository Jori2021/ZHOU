import axios from 'axios'
import ElementUI from "element-ui";


const request=axios.create({
    baseURL:'/api',
    timeout:10000
})

/**
 * request拦截器
 * 可以自请求发送前对请求做处理
 * 比如统一加token，对请求参数统一加密
 */
request.interceptors.request.use(config=> {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    if(user){
        config.headers['token']=user.token; //设置请求头
    }

    return config
},error => {
    return Promise.reject(error)
});

request.interceptors.response.use(response=>{
        let res=response.data;
        if(response.config.responseType==='blob'){
            return res
        }
        if(typeof res==='string'){
            res=res ? JSON.parse(res) :res
        }

        //当权限验证不通过
    if(res.code === '401'){
        ElementUI.Message({
            message:res.msg,
            type:'error'
        })
    }
        return res;
    },error => {
        console.log('err'+error)
        return Promise.reject(error)
    }
)

export default request