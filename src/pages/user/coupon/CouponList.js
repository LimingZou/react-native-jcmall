import React, { Component } from "react";
import {
  DeviceEventEmitter,
  Text,
  TouchableOpacity,
  View,
  Image,StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import CouponItem from "../../../components/my/coupon/couponItme";
import Time from '../../../utils/time';

import FlatList from "../../../components/flatList";
import { MyApi } from "../../../services/api/my";

class CouponList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestFail: false,
      page: 1,
      resolve: false,
      dataSource: props.dataSource,
      couponType: props.couponType
    };
    this.couponList = [];
    this.deleteNewsId = "";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.state.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      });
    }
  }

  detailItem(item, index,couponType) {
    let startDate = Time.formatStringDate(item.startTime,"YYYY.MM.DD")
    let endDate = Time.formatStringDate(item.endTime,"YYYY.MM.DD")
    let linkTime = startDate + "-" + endDate
    if (couponType == 1000) {
      return (
        <CouponItem
          key={index}
          colors={["#FD3D42", "#FE7E69"]}
          money={item.money}
          moneyoff={item.name}
          time={linkTime}
          describe={item.description}
          showUseButton={true}
          type={0}
        />
      );
    } else {
      return (
        <CouponItem
          key={index}
          colors={["#8C8C8C", "#A6A6A6"]}
          money={item.money}
          moneyoff={item.name}
          time={linkTime}
          describe={item.description}
          typedescribe={item.typedescribe}
          type={1}
        />
      );
    }
    
  }

  loadingFooterView = () => {
    const { page } = this.state;
    const pageNum = parseInt(page, 10) + 1;
    return (
      <View>
        <Text>没有更多优惠券</Text>
      </View>
    );
  };

  

  render() {
    const  {dataSource,couponType} = this.state
    let params = {
          status: couponType,
          pageSize: 10,
          currentPage: 1
        }
    return (
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <FlatList
          api={MyApi.coupon}
          fetchParams={params}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          ListHeaderComponent={() => null}
          renderItem={({ item ,index}) => (
            this.detailItem(item,index,couponType)
          )}
        />
      </View>
    );
  }
}

// <View style={{flex: 1,backgroundColor: "#f2f2f2",alignItems: "center"}}>
// <Image
//   style={{ width: 120, height: 69, marginTop: 129 }}
//   source={require("../../../images/mine/nocoupon.png")}
// />
// <Text style={{ color: "#7F7F7F", fontSize: 15, marginTop: 15 }}>
//   暂无可用的优惠券
// </Text>
// <View style={styles.GetCoupon}>
//   <Text style={{ color: "#E0324A", fontSize: 15 }}>
//     去领券中心逛逛
//   </Text>
// </View>
// </View>

export default connect()(withNavigation(CouponList));

const styles = StyleSheet.create({
  GetCoupon:{
    width: 150,
    height: 44,
    borderColor: "#E0324A",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
