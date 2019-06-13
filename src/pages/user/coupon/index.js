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
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CouponList from "./CouponList";

export default class Coupon extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.barItems = [
      {
        state_type: "nouse",
        tabLabel: "未使用"
      },
      {
        state_type: "used",
        tabLabel: "已使用"
      },
      {
        state_type: "losed",
        tabLabel: "已失效"
      }
    ];
    this.state = {
        nouseData:[],
        usedData:[],
        losedData:[]
    };
    this.scrollTabOnChage = this.scrollTabOnChage.bind(this);
  }

  componentDidMount(){
    this.getMyCouponList(1000)
  }
  
  async getMyCouponList(couponType){
    const e = await Fetch.fetch({
      api: MyApi.coupon,
      params: {
          status: couponType,
          pageSize: 10,
          currentPage: 1
      }
    });
    
    if(couponType == 1000){
      this.setState({
        nouseData: e.obj.list
      })
    }else if(couponType == 2000){
      this.setState({
        usedData: e.obj.list
      })
    }else{
      this.setState({
        losedData: e.obj.list
      })
    }
  }
  
  scrollBySwiper(index) {
    if (index % 1 === 0) {
      let couponType = 1000
        if(index == 1){couponType = 2000}
        if(index == 2){couponType = 3000}
      this.setState({
        sindex: index
      });
      this.getMyCouponList(couponType)
    }
  }

  scrollTabOnChage(index) {
    let couponType = 1000
        if(index == 1){couponType = 2000}
        if(index == 2){couponType = 3000}
        this.getMyCouponList(couponType)
        this.setState({
          sindex: index
        });
  }

  render() {
    const barItems = this.barItems;
    const { sindex,nouseData,usedData,losedData } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollableTabView
          initialPage={0} //默认为第一页
          page={sindex}
          locked={false}
          onScroll={this.scrollBySwiper.bind(this)}
          renderTabBar={() => (
            <SegmentedBar
              style={{
                height: 44,
                paddingBottom: 4,
                borderBottomWidth: 0.5,
                borderBottomColor: "#dedede"
              }}
              animated={true}
              indicatorType={"itemWidth"}
              activeIndex={sindex}
              indicatorLineColor={ThemeStyle.PriceColor}
              indicatorLineWidth={3}
              onChange={index => {
                this.scrollTabOnChage(index);
              }}
            >
              {barItems.map((item, index) => (
                <SegmentedBar.Item
                  activeTitleStyle={{ color: ThemeStyle.PriceColor }}
                  titleStyle={{ color: "#909090" }}
                  key={"item" + index}
                  title={item.tabLabel}
                />
              ))}
            </SegmentedBar>
          )}
        >
          <CouponList couponType={1000}  dataSource={nouseData} fetchNextData={(couponType)=>{this.getMyCouponList(couponType)}}/>
          <CouponList couponType={2000} dataSource={usedData} fetchNextData={(couponType)=>{this.getMyCouponList(couponType)}}/>
          <CouponList couponType={3000} dataSource={losedData} fetchNextData={(couponType)=>{this.getMyCouponList(couponType)}}/>

        </ScrollableTabView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"优惠券"}
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
                // this.props.navigation.navigate("JusuBeanIntroduce", {});
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
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  }
});
