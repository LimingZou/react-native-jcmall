import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from "react-native-progress";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import MarqueeWords from "../../../components/@jcmall/scrolletext/marqueewords";
import GoodsItem from "../../../components/goods/goodsItem";
import IdCard from '../../../components/user/idCard';
import FlatList from "../../../components/flatList";
import {GoodsApi} from '../../../services/api/goods';
import { HomeApi } from "../../../services/api/home";
import { connect } from "react-redux";
import * as Track from "../../../utils/track";
@connect(({ app: { user: { login, userInfo} } }) => ({
  login,
  userInfo
}))

export default class MainCreate extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollData: [
        { des: "151****3433刚刚成为黑卡会员", des1: "推广金1" },
        { des: "181****5634刚刚成为金卡会员", des1: "推广金2" },
        { des: "136****8776刚刚成为黑卡会员", des1: "推广金3" },
        { des: "189****4565刚刚成为尊卡会员", des1: "推广金4" },
        { des: "173****8771刚刚成为尊卡会员", des1: "推广金5" },
        { des: "189****4565刚刚成为尊卡会员", des1: "推广金6" },
        { des: "173****8771刚刚成为尊卡会员", des1: "推广金7" },
        { des: "189****4565刚刚成为尊卡会员", des1: "推广金8" },
        { des: "173****8771刚刚成为尊卡会员", des1: "推广金9" }
      ]
    };
  }

  _getItem(item, index){
    let key = "main" + index
    return(
      <GoodsItem
        style={{marginLeft:12}}
        key={key}
        data={{
          img: {url:item.url},
          title:item.name,
          price:item.salePrice,
          market_price:item.marketPrice
        }}
        index={index}
        onPress={() => {
          this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_ZHUCHUANGQU_LIST});
        }}
      />
    )
  }

  render() {
    const { login, userInfo } = this.props;
    const { width: bgWidth, height: bgHeight } = Image.resolveAssetSource(
      require("../../../images/mine/wd-bg.png")
    );
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
        <FlatList
            listRef={(FlatList) => {this.myFlatList = FlatList }}
            api={HomeApi.itemsModule}
            fetchParams={{
              moduleType:1000,
              moduleCode:"HOMEPAGE_ZHUCHUANGQU",
            }}
            keyExtractor={(item, index) => index}
            scrollEventThrottle={16}
            numColumns={2}
            ListHeaderComponent={(
              <View style={{flex:1}}>
                <LinearGradient
                  locations={[0, 0.5]}
                  colors={["#fe7e69", "#fd3d42"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    alignItems: "center"
                  }}>
                  <IdCard
                    avatarPress={()=>{
                      if(login){
                        this.props.navigation.navigate("PersonInformation")
                      }else{
                        this.props.navigation.navigate("UserLogin")
                      }
                    }}
                  />
                </LinearGradient>
                <View style={{width: windowWidth, height: 249,backgroundColor: "#EB4343"}}>
                  <View style={{paddingTop: 20,justifyContent: "center",alignItems: "center",flexDirection: "row"}}>
                    <View style={{ height: 0.5, width: 50, backgroundColor: "#fff" }}/>
                    <View style={{height: 5,width: 5,backgroundColor: "#fff",marginRight: 20,borderRadius: 2.5}}/>
                    <Text style={{ fontSize: 14, color: "#fff" }}>会员动态</Text>
                    <View style={styles.dynamic}/>
                    <View style={{ height: 0.5, width: 50, backgroundColor: "#fff" }}/>
                  </View>

                  <MarqueeWords scrollData={this.state.scrollData} />
                </View>
                <View style={{paddingTop: 20,paddingBottom: 10,justifyContent: "center",alignItems: "center",flexDirection:'row'}}>
                  <View style={{width:84,height:1,backgroundColor:'#D9D9D9'}}/>
                  <Text style={{ fontSize: 14, color: "#333333",marginHorizontal:10 }}>主创区</Text>
                  <View style={{width:84,height:1,backgroundColor:'#D9D9D9'}}/>
                </View>
            </View>
            )}
            renderItem={({ item, index }) => this._getItem(item, index)}
        />

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"主创区"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
          rightView={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("JusuBeanIntroduce", {});
              }}
            >
              <Icon name={"-help"} size={20} color={"#333333"} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, backgroundColor: "#F2F2F2",
    alignItems:'center'
  },
  dynamic:{
    height: 5,
    width: 5,
    backgroundColor: "#fff",
    borderRadius: 2.5,
    marginLeft: 20
  },
  mainView:{
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  mainLine:{
    height: 0.5,
    width: 50,
    backgroundColor: "#333333",
    marginRight: 20
  }

});
