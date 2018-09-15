import {reqHomeData,reqCategoryData,reqShiWu} from '../api'

import {RECEIVEHOMEDATA,RECEIVESHIWUDATA,RECEIVECATEGORYDATA} from './actionTypes'

const receiveHomeData = (data) => ({type:RECEIVEHOMEDATA,data});
const receiveShiwuData = (data) => ({type:RECEIVESHIWUDATA,data});
const receiveCategoryData = (data) => ({type:RECEIVECATEGORYDATA,data});

export const  getHomeData = ()=> {
    return async dispatch=>{
      const response =await reqHomeData();
      if(!response.code){
        const {data} = response;
        dispatch(receiveHomeData(data))
      }
    }
};
export const  getShiwuData = ()=> {
  return async dispatch=>{
    const response =await reqShiWu();
    if(!response.code){
      const {data} = response;
      dispatch(receiveShiwuData(data))
    }
  }
};
export const  getCategoryData = ()=> {
  return async dispatch=>{
    const response =await reqCategoryData();
    if(!response.code){
      const {data} = response;
      dispatch(receiveCategoryData(data))
    }
  }
};