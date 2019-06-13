import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { windowWidth } from "../../utils/style";
import { requestDel, requestCartList, selectItem, requestAdd } from "../../redux/actions/cart";
import CartItem from "../../components/cart/item";
import { Loading, NullData } from "../../components/cart/fetch"
import { store } from "../../redux/store";
import NavigationService from "../../containers/navigationService";
import * as Track from "../../utils/track";

@connect(({
            app: {
              user: {
                login
              }
            },
            view: {
              cart: {
                cartList,
                cartListFetchStatus,
                isAllSelected,
                totalNumber,
                totalCount,
                totalPrice,
                skus
              }
            }
          }) => ({
  login,
  cartList,
  fetchStatus:cartListFetchStatus,
  isAllSelected,
  totalNumber,
  totalCount,
  totalPrice,
  skus
}))

@stateHoc({
  height:windowWidth/1.5,
  needLogin:true,
  LoadingView: Loading,
  NullDataView: NullData
})

export default class CartList extends Component {

  hocComponentDidMount() {
    this.props.dispatch(requestCartList({params:{}, options:{}}));
  }

  hocNullData() {
    const { cartList } = this.props;
    return !(cartList && cartList.length || false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "login",
        "cartList",
        "fetchStatus",
        "isAllSelected",
        "totalNumber",
        "totalCount",
        "totalPrice",
        "skus"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  render(){
    const { cartList  } = this.props;
    console.log('购物车列表props', this.props);
    return (
      <View style={{flex:1}}>
        {cartList && cartList.map((item, index) =>{
          return (
            <CartItem
              key={index}
              title={item.spuName}
              price={item.salePrice}
              spec={item.skuName}
              cover={item.img}
              checked={item.isCheck}
              number={item.skuCount}
              other={item}
              delete={()=>{
                this.props.dispatch(requestDel(item.skuId));
              }}
              onStepperChange={value => {
                this.props.dispatch(requestAdd(item.skuId, value));
              }}
              onCheckboxClick={value => {
                this.props.dispatch(selectItem(item.skuId));
              }}
              onImageClick={() => {
                NavigationService.navigate("ProductDetailPage", {spuId:item.spuId, code:""});
              }}
              onTitleClick={() => {
                NavigationService.navigate("ProductDetailPage", {spuId:item.spuId, code:""});
              }}
            />
          )
        })}
      </View>
    );
  }
}
