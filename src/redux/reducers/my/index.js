import types from "../../types";
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
    BankItem:null,
    Amount: null,
    AmountFetchStatus: fetchStatus.l,
    Banks: null,
    BanksFetchStatus: fetchStatus.l
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.my.GET_USER_AMOUNT:
        return {
            ...state,
            Amount: action.data,
            AmountFetchStatus: action.fetchStatus
        };
    case types.my.GET_USER_BANKS:
        return {
            ...state,
            Banks: action.data,
            BanksFetchStatus: action.fetchStatus
        };
    default:
      return state;
    }
};

function defaultBank(bankData){
    let BankItem = {}
    if(bankData&&bankData.list){
        bankData = bankData.list
    }else{
        return  BankItem
    }
    for (let index = 0; index < bankData.length; index++) {
        const element = bankData[index];
        if(element.isDefaultBankCard == 1){
            return BankItem = bankData[index]
        }
    }
    if(BankItem){
        return BankItem = bankData[0]
    }
}