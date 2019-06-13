import types from "../../types";
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
  totalNumber:0,
  totalCount:0,
  totalPrice:0,
  skus:null,
  isAllSelected:false,
  cartList:null,
  cartListFetchStatus:fetchStatus.l
};

const cartMath = (list=[]) => {
  if (list) {
    let number = 0;
    list.map((item)=>{
      number+= item.skuCount;
    });
    let selects = list.filter((item)=>{
      if (item.isCheck === true) {
        return item;
      }
    });
    let selected = selects.length === list.length;
    let skus = _.join(selects.map((item)=>item.skuId), ',');
    let count = 0;
    let price = 0;
    selects.map((item)=>{
      count+= item.skuCount;
      price+= item.salePrice * item.skuCount;
    });
    return {
      skus,
      number,
      count,
      price,
      selected
    }
  }
  return {
    skus:"",
    number:0,
    count:0,
    price:0,
    selected: false
  }
}

export default (state = initialState, action) => {

  let other = null;
  switch (action.type) {
    case types.cart.GET_CART_LIST:
      other = cartMath(action.data);
      return {
        ...state,
        cartList: action.data,
        cartListFetchStatus: action.fetchStatus,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
        isAllSelected:other.selected
      };
    case types.cart.SELECT_ALL:
    {
      let isAllSelected = action.isAllSelected;
      let newCartList = state.cartList.map((item)=>{
        item.isCheck = isAllSelected;
        return item;
      });
      other = cartMath(newCartList);
      return {
        ...state,
        cartList: newCartList,
        isAllSelected: isAllSelected,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
      };
    }
    case types.cart.SELECT_ITEM:
      let newCartList = state.cartList.map((item)=>{
        if (action.cartId === item.skuId) {
          item.isCheck = !item.isCheck;
        }
        return item;
      });
      other = cartMath(newCartList);
      return {
        ...state,
        cartList: newCartList,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
        isAllSelected:other.selected
      };
    case types.cart.REMOVE_ITEM:
    {
      let newCartList = _.remove(state.cartList, (item)=>{
        return item.skuId !== action.cartId;
      });
      other = cartMath(newCartList);
      return {
        ...state,
        cartList: newCartList,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
        isAllSelected:other.selected
      };
    }
    case types.cart.REMOVE_ITEMS:
    {
      let newCartList = _.remove(state.cartList, (item)=>{
        return  !_.find(_.split(action.cartIds, ',').map(n=>{return {skuId:parseInt(n)}}), ['skuId', item.skuId])
      });
      other = cartMath(newCartList);
      return {
        ...state,
        cartList: newCartList,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
        isAllSelected:other.selected
      };
    }
    case types.cart.UPDATE_COUNT:
    {
      let newCartList = state.cartList.map((item)=>{
        if (action.cartId === item.skuId){
          item.skuCount = action.count;
        }
        return item;
      });
      other = cartMath(newCartList);
      return {
        ...state,
        cartList: newCartList,
        skus:other.skus,
        totalNumber:other.number,
        totalCount:other.count,
        totalPrice:other.price,
        isAllSelected:other.selected
      };
    }
    default:
      return state;
  }
};


