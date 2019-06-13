import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import {windowWidth} from "../../../utils/style";
import Button from "../../../components/goods/button";
import { HomeApi } from "../../../services/api/home";
import FlatList from "../../../components/flatList";
import GoodsItem, { Type } from "../../../components/goods/goodsItem";
import Banner from "../banner";
import * as Track from "../../../utils/track";

const tabList = [
  {
    state_type: "halfbean",
    state_value: "HOMEPAGE_HUOBAOQU",
    item_type: Type.h,
    tabLabel: "火爆区",
    tabDes: "火爆区享受权益",
    tabDesElement: <Text style={{fontSize: 11, color: "white"}}>集速豆抵扣现金购买商品；火爆区享受权益描述；</Text>,
    code:Track.TRACK_XIANJINDOU_LIST
  },
  {
    state_type: "fullbean",
    state_value: "HOMEPAGE_CHAOJIQU",
    item_type: Type.f,
    tabLabel: "超级区",
    tabDes: "超级区享受权益",
    tabDesElement: <Text style={{fontSize: 11, color: "white"}}>全豆购买正价商品；超级区享受权益描述；</Text>,
    code:Track.TRACK_QUANDOU_LIST
  },
  {
    state_type: "specials",
    state_value: "HOMEPAGE_XINRENTEHUI",
    item_type: Type.s,
    tabLabel: "新人特惠",
    tabDes: "新人特惠享用流程",
    tabDesElement: (
      <View style={{flexDirection: "row"}}>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"成为集呈会员"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"下载APP"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"领券"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"下单"}
        </Text>
      </View>
    ),
    code:Track.TRACK_XINRENTEHUI_LIST
  },
  {
    state_type: "benefits",
    state_value: "HOMEPAGE_HUIYUANFULI",
    item_type: Type.n,
    tabLabel: "会员福利",
    tabDes: "会员福利享用流程",
    tabDesElement: (
      <View style={{flexDirection: "row"}}>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"成为集呈会员"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"下载APP"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"领券"}
        </Text>
        <Icon style={{marginTop: 2}} name="-arrow-right" size={11} color="#C10004"/>
        <Text
          style={{fontSize: 11, color: "white"}}
        >
          {"下单"}
        </Text>
      </View>
    ),
    code:Track.TRACK_HUIYUANFULI_LIST
  }
];

export default class SpecialOffer extends Component {
    static navigationOptions = {
        header: null
    };

  state = {
    state_value: null,
    state_type: null,
    item_type: null,
    tabLabel: null,
    tabDes: null,
    tabDesElement: null,
    code: null
  };

  async componentWillMount() {
    const state_type = this.props.navigation.getParam("state_type");
    if (state_type) {
      this.setState({
        state_type,
        state_value: tabList[_.findIndex(tabList, ["state_type", state_type])].state_value,
        item_type: tabList[_.findIndex(tabList, ["state_type", state_type])].item_type,
        tabLabel:tabList[_.findIndex(tabList, ["state_type", state_type])].tabLabel,
        tabDes:tabList[_.findIndex(tabList, ["state_type", state_type])].tabDes,
        tabDesElement:tabList[_.findIndex(tabList, ["state_type", state_type])].tabDesElement,
        code:tabList[_.findIndex(tabList, ["state_type", state_type])].code
      });
    }
  }

    render() {
      const state_type = this.props.navigation.getParam("state_type");
      const { tabLabel, tabDes, state_value, item_type, tabDesElement, code } = this.state;
        return (
            <View
                style={[
                    styles.container,
                    {paddingTop: NavigationBar.Theme.contentHeight}
                ]}
            >
              <FlatList
                api={HomeApi.itemsModule}
                keyExtractor={(item, index) => index.toString()}
                scrollEventThrottle={16}
                numColumns={2}
                ListHeaderComponent={(
                  <View>
                    <View style={{width: windowWidth, height: 0.5, color: "#cccccc"}}/>
                    <Banner
                      useTile={true}
                      moduleCode={state_value}
                      handelLink={link=>{

                      }}
                    />
                    <Button style={{
                      width: windowWidth,
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                            colors={["#FE7E69", "#FD3D42"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            locations={[0, 1]}
                    >
                      <Text style={{fontSize: 15, color: "white"}} numberOfLines={1}>
                        {tabDes}
                      </Text>
                      <View style={{flexDirection: "row", marginTop: 5}}>
                        {tabDesElement}
                      </View>
                    </Button>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10
                      }}
                    >
                      <View
                        style={{width: 50, height: 1, backgroundColor: "#999999"}}
                      />
                      <Text
                        style={{fontSize: 18, color: "#333333", marginHorizontal: 10}}
                      >
                        {tabLabel}
                      </Text>
                      <View
                        style={{width: 50, height: 1, backgroundColor: "#999999"}}
                      />
                    </View>
                  </View>
                )}
                fetchParams={{
                  pageId:1,
                  moduleType:1000,
                  moduleCode:state_value,
                }}
                renderItem={({item, index})=>{
                  console.log('商品item',item)
                  return (
                    <GoodsItem
                      type={item_type}
                      key={index}
                      data={{
                        img: {
                          url:item.url
                        },
                        title:item.name,
                        price:item.salePrice,
                        market_price:item.marketPrice,
                        jisu_price:item.jisuPrice
                      }}
                      index={index}
                      onPress={() => {
                        this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId,code,state_type});
                      }}
                    />
                  )
                }}
              />
                <NavigationBar
                    style={{backgroundColor: "#fff"}}
                    statusBarStyle={"dark-content"}
                    title={tabLabel}
                    titleStyle={{
                        fontSize: 18,
                        color: "#333333"
                    }}
                    leftView={
                        <NavigationBar.BackButton
                            onPress={() => this.props.navigation.pop()}
                        />
                    }
                    rightView={<Icon name={"-share"} size={16} color={"#333333"}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    }
});
