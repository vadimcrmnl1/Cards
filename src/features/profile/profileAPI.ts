import {instance} from "../../api/api";



export const profileAPI={
    /*getData(){
        return instance.post('auth/me')
    },*/

    changeName(name:string){
        return instance.put('auth/me',{name})
    }
}