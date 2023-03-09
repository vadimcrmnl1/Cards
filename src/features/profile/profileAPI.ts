import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,

})

export const profileAPI={
    /*getData(){
        return instance.post('auth/me')
    },*/
    logout(){
        return instance.delete('auth/me')
    },
    changeName(name:string){
        return instance.put('auth/me',{name})
    }
}