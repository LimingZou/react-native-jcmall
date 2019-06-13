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
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import CetCouponItem from "../../../components/my/others/getcouponItem";
import LFlatList from "../../../components/public/LFlatList";
import Fetch from "../../../utils/fetch";
import { Others } from "../../../services/api/others";
import { Toast } from "../../../utils/function";
export default class OtherCoupon extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  fetchNextData() {}

  getCoupon(type,id) {
    this.couponByUserId(id)
  }

  componentDidMount() {
    this.couponListPage()
  }

  async couponListPage(){
    Fetch.fetch({
      api: Others.couponListPage,
      params:{}
    }).then(e => {
      console.log(e)
      console.log("---优惠券---")
      if (e.code === 0||e.code==='0000') {
        this.setState({
          dataSource:e.obj.list,
        })
      } else {
        Toast.error(e.code);
      }
    });
  }

  async couponByUserId(couponRuleId){
    Fetch.fetch({
      api: Others.couponByUserId,
      params:{
        couponRuleId:couponRuleId,
      }
    }).then(e => {
      if (e.code === '-1') {
        Toast.info(e.message)
      }else if(e.code === '0000'){
        Toast.info(e.message)
        this.couponListPage()
      } else {
        Toast.error(e.code);
      }
    });
  }
  render() {
    const barItems = this.barItems;
    const { dataSource } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <LFlatList
          keyExtractor={e => String(e.id)}
          dataSource={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item, index }) => (
            <CetCouponItem
              moneyoff={item.name}
              time={'000'}
              startTime={item.startTime}
              endTime={item.endTime}
              sendStartTime={item.sendStartTime}
              sendEndTime={item.sendEndTime}
              typedescribe={item.description}
              getCoupon={type => {
                this.getCoupon(type,item.id);
              }}
            />
          )}
        />

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
                this.props.navigation.navigate("Coupon", {});
              }}
            >
              <Text style={{ color: "#333333", fontSize: 13 }}>我的优惠券</Text>
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
    alignItems: "center"
  },
  buttomView: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
