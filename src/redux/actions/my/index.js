import types from "../../types";
import { Toast } from "../../../utils/function";
import { MyApi } from "../../../services/api/my";
import { fetchStatus } from "../../../utils";
import Fetch from "../../../utils/fetch";
import fa from "../../../utils/fa";

export const getMyData = () => {
    return async dispatch => {
      dispatch(requestAmount());
    };
};

export const  requestAmount = ()=>{
    return async dispatch => {
        try{
            dispatch(updateAmount(null,fetchStatus.l));
            const e = await Fetch.fetch({
                api: MyApi.balance
            });
            if(fa.code.isSuccess(e.code)){
                dispatch(updateAmount(e.obj,fetchStatus.s))
            }else{
                Toast.warn(e.message);
                dispatch(updateAmount(null,fetchStatus.e))
            }
        }catch(err){
                dispatch(updateAmount(null,fetchStatus.f))
        }
    }
}

//获取用户银行卡
export const  requestBanks = ()=>{
    return async dispatch => {
        try{
            dispatch(updateBanks(null,fetchStatus.l));
            const e = await Fetch.fetch({
                api: MyApi.selectBank
            });
            if(fa.code.isSuccess(e.code)){
                dispatch(updateBanks(e.obj,fetchStatus.s))
            }else{
                Toast.warn(e.message);
                dispatch(updateBanks(null,fetchStatus.e))
            }
        }catch(err){
                dispatch(updateBanks(null,fetchStatus.f))
        }
    }
}

const updateBanks =  (data,fetchStatus)=>{
    return {
        type: types.my.GET_USER_BANKS,
        data,
        fetchStatus
    }
}

const updateAmount = (data,fetchStatus)=>{
    return {
        type: types.my.GET_USER_AMOUNT,
        data,
        fetchStatus
    }
}
