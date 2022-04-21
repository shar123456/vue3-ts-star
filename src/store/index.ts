import { deburr } from 'lodash';
import { createStore } from 'vuex'
import {login,register,getCode} from '../Request/login'
export default createStore({
  state: {
    TOKEN: ""
  },
  mutations: {
    SetToken(state, payLoad) {
      state.TOKEN = payLoad;
    }
  },
  actions: {
     LoginSys({commit},payLoad){
     return new Promise((resolve)  => {
        const {user,password}=payLoad;
        setTimeout(  ()  => {          
           login({user,password}).then((res:any)=>{
       
              if (!res.result) {
                resolve(false);
              } else {
                commit("SetToken",res.token);
                localStorage.setItem("starToken",JSON.stringify(res.token));
                resolve(true);
               }
            }).catch((err:any)=>{
              console.log(err);
              resolve(false);
            });
        }, 200);
      });
    },
    RegisterSys({commit},payLoad){
      return new Promise((resolve)  => {
         
         setTimeout(  ()  => {          
          register(payLoad).then((res:any)=>{
               if (!res.result) {
                 resolve(false);
               } else {
                
                 resolve(true);
                }
             }).catch((err:any)=>{
               console.log(err);
               resolve(false);
             });
         }, 1);
       });
     },
     GetCodeSys({commit}){
      return new Promise((resolve)  => {
         
         setTimeout(  ()  => {          
          getCode().then((res:any)=>{
               if (!res.success) {
                 resolve(false);
               } else {
                
                 resolve(res);
                }
             }).catch((err:any)=>{
               console.log(err);
               resolve(false);
             });
         }, 1);
       });
     }
  },
  modules: {
  }
})
