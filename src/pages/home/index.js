import React, { Component } from "react";
import {
  StyleSheet,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { View } from 'react-native-animatable';
import { homeViewInit } from "../../redux/actions/home";
import { HomeApi } from "../../services/api/home";

import { PublicStyles, windowWidth } from "../../utils/style";
import Banner from "./banner";
import Menubar from "./menubar";
import NewcomerSpecials from "./newcomerSpecials"
import MemberBenefits from "./memberBenefits"
import CardWindow from "../../components/page/cardWindow";
import Limited from "./limited"
import Master from "./master"
import Fullbean from "./fullbean"
import Halfbean from "./halfbean"
import FlatList from "../../components/flatList";
import GoodsItem, { Type } from "../../components/goods/goodsItem";

import GroupWindow from "../../components/page/groupWindow";
import NavigationBar from "../../components/@jcmall/navbar";
import SearchNavbar from "../../components/page/searchNavbar";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Path } from "react-native-svg/index";

import * as Track from "../../utils/track";
import wechat from "@yyyyu/react-native-wechat";

@connect(({
            view: {
              home: {
                featured,
                featuredFetchStatus,
              }
            },
            app: {
              user: {
                login,
                unreadMessageNumber
              }

            }
          }) => ({
  login,
  featured,
  unreadMessageNumber,
  fetchStatus: featuredFetchStatus,
}))

export default class Home extends Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "login",
        "featured",
        "login",
        "unreadMessageNumber",
        "featuredFetchStatus"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  refresh = () => {
    this.props.dispatch(homeViewInit())
  };

  _onScroll = (event, bannerHeight) => {
    let scrollY = event.nativeEvent.contentOffset.y;
    let currentOpacity;

    if (scrollY < bannerHeight) {
      currentOpacity = scrollY / bannerHeight;
    } else {
      currentOpacity = 1;
    }
    this._refSearchBar.setOpacity(currentOpacity);
  };

  render() {
    console.log('home props',this.props);
    const cards = {
      data:[
        { type:"limited",   element:<Limited />,  path:"LimitedTimeBuy",  params: {}},
        { type:"master",    element:<Master />,   path:"MainCreate",      params: {} },
        { type:"fullbean",  element:<Fullbean />, path:"SpecialOffer",    params: { state_type: "fullbean" } },
        { type:"halfbean",  element:<Halfbean />, path:"SpecialOffer",    params: { state_type: "halfbean" } }
      ]
    };
    const { unreadMessageNumber:{ state_all }, login, navigation } = this.props;
    return (
      <View animation="fadeIn" duration={400} delay={100} style={PublicStyles.ViewMax}>
        <View
          style={{
            backgroundColor:"#fff",
            height: NavigationBar.Theme.statusBarHeight
          }}
        />
        <FlatList
          ref={e => this.FlatList = e}
          floating={true}
          api={HomeApi.itemsModule}
          keyExtractor={(item, index) => index.toString()}paddingH
          scrollEventThrottle={16}
          numColumns={2}
          onScroll={event => {
            this._onScroll(event, NavigationBar.Theme.contentHeight * 2);
          }}
          refresh={this.refresh.bind(this)}
          ListHeaderComponent={(
            <View>
              <Banner
                moduleCode={"HOMEPAGE_BANNER"}
                handelLink={link=>{

                }}
              />
              <View>
                <View style={{ marginTop: -30 }}>
                  <Svg height="30" width="100%">
                    <Path
                      d={`M0 30 A1500 1500 0 0,1 ${windowWidth} 30`}
                      fill="white"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </Svg>
                </View>
                <Menubar onPress={ (item, {path, params}) => {
                  if (path) {
                    this.props.navigation.navigate(path, params);
                  } else {
                    alert(`${item.namne}: 暂未开发`);
                  }
                }}/>
              </View>
              <LinearGradient
                colors={["#fc918b", "#fc9b78", "#f73e41"]}
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                  marginTop: 10,
                  alignItems: "center"
                }}
              >
                <Image source={require("../../images/home/sy_gg.png")} />
                <NewcomerSpecials
                  onBackgroundPress={()=>{
                    this.props.navigation.navigate("SpecialOffer", {state_type:"specials"});
                  }}

                  onPress={(item) => {
                    console.log("--item--",item)
                    this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_HOME_XINRENTEHUI,state_type:"specials"});
                  }}
                />
                <CardWindow
                  style={{
                    marginBottom: 10
                  }}
                  windowSpacingHorizontal={5}
                  windowPaddingHorizontal={10}
                  data={cards}
                  onPress={({type, path, params}) => {
                    this.props.navigation.navigate(path, params);
                  }}
                  renderItem={({element}) => (element)}
                />
                <MemberBenefits
                  onBackgroundPress={()=>{
                    this.props.navigation.navigate("SpecialOffer", {state_type:"benefits"});
                  }}
                  onPress={(item) => {
                    this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_HOME_HUIYUANFULI});
                  }}
                />
              </LinearGradient>
              <GroupWindow
                icon={require("../../images/home/sy_jx.png")}
                title={"精选"}
                tip={"为你精挑细选"}
              />
            </View>
          )}
          fetchParams={{
            moduleType:1000,
            moduleCode:"HOMEPAGE_JINGXUAN",
          }}
          renderItem={({item, index})=>(
            <GoodsItem
              type={Type.n}
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
                this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_HOME_JINGXUAN});
              }}
            />
          )}
        />
        <SearchNavbar
          ref={c => (this._refSearchBar = c)}
          dot={state_all}
          onScan={() => {
            const {login} = this.props
            if(login){
              // this.props.navigation.navigate("PaySuccess");
              this.props.navigation.navigate("Qr");
            }else{
              this.props.navigation.navigate('UserLogin', {})
            }
          }}
          onSearch={() => {
            this.props.navigation.navigate("SearchPage");
          }}
          onNews={() => {
            login ? navigation.navigate("NewsPage") : navigation.navigate("UserLogin");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
