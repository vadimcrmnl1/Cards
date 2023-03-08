import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,

})

export const profileAPI={
    logout(){
        return instance.delete('auth/me')
    },
    changeName(name:string){
        return instance.put('auth/me',{name})
    }
}