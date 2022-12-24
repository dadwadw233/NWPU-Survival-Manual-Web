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

export const getCommentLimit = (a:string,b:string) => {
    return request({
        url: 'http://localhost:8088/comment/limit/manager?start='+a+'&offset='+b,
        method: 'get'
    });
};
export const getCourseNum = () =>{
    return request({
        url: 'http://localhost:8088/course/getnum',
        method: 'get'
    })
};

export const getCommentNum = () =>{
    return request({
        url: 'http://localhost:8088/comment/number',
        method: 'get'
    })
};
export const getCommentNumByCno = (cno:string) =>{
    return request({
        url: 'http://localhost:8088/course/comment/num?cno='+cno,
        method: 'get'
    })
};
export const addNewComment = (comment:object) =>{
    return request({
        url: 'http://localhost:8088/comment/new',
        method: 'post',
        data:comment
    })
};
export const deleteCourse = (cno:string) =>{
    return request({
        url: 'http://localhost:8088/course/delete',
        method: 'post',
        data:{
            'cno':cno
        }
    })
};
export const deleteComment = (cno:string, cid:number) =>{
    return request({
        url: 'http://localhost:8088/comment/delete',
        method: 'post',
        data:{
            'cno':cno,
            'cid':cid
        }
    })
};

export const passComment = (cno:string, cid:number) =>{
    return request({
        url: 'http://localhost:8088/comment/pass',
        method: 'post',
        data:{
            'cno':cno,
            'cid':cid
        }
    })
};
export const searchCourse = (cname:string, tname:string, dname:string) =>{
    return request({
        url: 'http://localhost:8088/course/search?cname='+cname+'&tname='+tname+'&dname='+dname,
        method: 'get',
    })
};
export const searchCourseRegional = (cname:string, tname:string, dname:string, start:string, offset:string) =>{
    return request({
        url: 'http://localhost:8088/course/search/limit?cname='+cname+'&tname='+tname+'&dname='+dname+'&start='+start+'&offset='+offset,
        method: 'get',
    })
};
export const selectCourseByCno = (cno:string) =>{
    return request({
        url: 'http://localhost:8088/course/search?cno='+cno,
        method: 'get',
    })
};

export const updateCourseInfo = (course:object) =>{
    return request({
        url: 'http://localhost:8088/course/update',
        method: 'post',
        data:course
    })
};

export const insertNewCourse = (data:object)=>{
    return request({
        url:'http://localhost:8088/course/new',
        method: 'post',
        data: data
    })
}

export const selectCourseByLabel = (label:string)=>{
    return request({
        url:'http://localhost:8088/course/get?label='+label,
        method: 'get',
    })
}

export const getRelationByCnos = (first:string, second:string)=>{
    return request({
        url:'http://localhost:8088/course/relation?first='+first+'&second='+second,
        method: 'get',
    })
}

export const getRelationByNames = (first:string, second:string)=>{
    return request({
        url:'http://localhost:8088/course/relation/name?first='+first+'&second='+second,
        method: 'get',
    })
}
