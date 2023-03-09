import {instance} from "../../api/cards-api";



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