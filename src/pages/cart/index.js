import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import { connect } from "react-redux";
import { windowWidth, PublicStyles } from "../../utils/style";
import NavigationBar from "../../components/@jcmall/navbar";
import CartBottom from "../../components/cart/bottom";
import { HomeApi } from "../../services/api/home";
import FlatList from "../../components/flatList";
import GoodsItem from "../../components/goods/goodsItem";
import { selectAll, requestDels, requestCartList } from "../../redux/actions/cart";

import CartList from "./list";
import * as Track from "../../utils/track";

@connect(({
            view: {
              cart: {
                cartList,
                isAllSelected,
                totalNumber,
                totalCount,
                totalPrice,
                skus,
              }
            }
}) => ({
  cartList,
  isAllSelected,
  totalNumber,
  totalCount,
  totalPrice,
  skus
}))

export default class CartIndex extends Component {

  constructor(props){
    super(props);

  }
  state = {
    edit: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "cartList",
        "isAllSelected",
        "totalNumber",
        "totalCount",
        "totalPrice",
        "skus"
      ]
    );
    const isStateChanged = U.isObjDiff(
      [nextState, this.state],
      [
        "edit"
      ]
    );
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  refresh = () => {
    this.props.dispatch(requestCartList({params:{}, options:{}}));
  };

  render() {
    const { cartList, isAllSelected, totalCount, totalNumber, totalPrice, skus } = this.props;
    console.log('购物车props', this.props);
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <FlatList
          ref={e => this.FlatList = e}
          api={HomeApi.itemsModule}
          refresh={this.refresh.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          numColumns={2}
          ListHeaderComponent={
            <View>
              <CartList/>
              <View
                style={{
                  paddingTop: 40,
                  paddingBottom: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 14, color: "#333333" }}>猜你喜欢</Text>
              </View>
            </View>
          }
          fetchParams={{
            moduleType:1000,
            moduleCode:"CAINIXIHUAN",
          }}
          renderItem={({item, index})=>(
            <GoodsItem
              key={index}
              data={{
                img: {
                  url:item.url
                },
                title:item.name,
                price:item.salePrice,
                market_price:item.marketPrice
              }}
              index={index}
              onPress={() => {
                this.props.navigation.push("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_SHOOPINGCAR_CAINIXIHUAN})
              }}
            />
          )}
        />
        {cartList && cartList.length > 0 ? (
          <CartBottom
            ref={e => (this.cartBottom = e)}
            onAllChecked={()=>{
              console.log('全选');
              this.props.dispatch(selectAll(!isAllSelected));
            }}
            onRemove={()=>{
              this.props.dispatch(requestDels(skus));
              console.log('移除');
            }}
            onSettle={()=>{
              console.log('结算');
              this.props.navigation.navigate("SureOrder", {skus:skus,type:"car"})
            }}
            selected={isAllSelected}
            totalNum={totalCount}
            total={totalPrice}
          />
        ): null}
        <NavigationBar
          rightView={
            cartList && cartList.length > 0 ? (
              <Text
                onPress={() => {
                  this.setState({
                    edit: !this.state.edit
                  }, ()=>{
                    this.cartBottom.setEdit(this.state.edit)
                  });
                }}
              >
                {this.state.edit ? "完成" : "编辑"}
              </Text>
            ):null
          }
          style={{ backgroundColor: "#fff" }}
          title={`购物车${totalNumber > 0 ? `(${totalNumber})` : ""}`}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}

// 占位图，登录提示
const styles = StyleSheet.create({
  cartCardItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFFFFF"
  },
  cartCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: windowWidth - 30 - 16 - 15 - 75 - 10
  },
  cartCardImage: {
    width: 75,
    height: 75,
    marginRight: 10
  },
  cartCardCheck: {
    width: 16,
    height: 16,
    marginRight: 15,
    marginTop: 30
  },
  cartCardTitleSpec: {
    // width:windowWidth,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  cartCardTitle: {
    color: "#333333",
    lineHeight: 20,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "PingFangSC-Regular"
  },
  cartCardSpec: {
    justifyContent: "space-between"
  },
  cartCardSpecCanSkuSelect: {
    alignItems: "center",
    padding: 5
  },
  cartCardSpecText: {
    color: "#999",
    lineHeight: 11,
    height: 11,
    fontSize: 11,
    marginRight: 5
  },
  cartCardPriceSpecImage: {
    width: 6,
    height: 6
  },
  cartCardFooter: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40
  },
  cartCardPrice: {
    lineHeight: 14,
    height: 14,
    color: "#FF635C",
    fontSize: 14,
    fontWeight: "800"
  },
  cartCardStepper: {
    width: 100
  }
});
