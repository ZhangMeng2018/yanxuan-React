import {RECEIVEHOMEDATA,RECEIVESHIWUDATA,RECEIVECATEGORYDATA} from './actionTypes'
let intiState = {
  home_data:{},
  category_data:[],
  shiwu_data:{}
};

export default function  (state=intiState,action) {
  switch (action.type) {
    case RECEIVEHOMEDATA:
      const home_data = action.data;
      return {...state, home_data};
    case RECEIVECATEGORYDATA:
      const category_data = action.data;
      return {...state, category_data};
    case RECEIVESHIWUDATA:
      const shiwu_data = action.data;
      return {...state, shiwu_data};
    default:
      return state
  }
}

