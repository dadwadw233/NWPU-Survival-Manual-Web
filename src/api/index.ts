import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: 'http://localhost:8088/course/all',
        method: 'get'
    });
};
export const fetchDataLimit = (a:string,b:string) => {
    return request({
        url: 'http://localhost:8088/course/limit?start='+a+'&offset='+b,
        method: 'get'
    });
};
export const getCourseNum = () =>{
    return request({
        url: 'http://localhost:8088/course/getnum',
        method: 'get'
    })
};
