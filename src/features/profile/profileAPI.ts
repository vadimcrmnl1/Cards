import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,

})

export const profileAPI={
    logout(){
        instance.delete('auth/me')
    },
    changeName(newName:string){
        instance.put('auth/me',{newName})
    }
}