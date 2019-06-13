/**
 * 本地生活消费记录列表item
 * 示例：
 * style={{height:87,backgroundColor:'white'}}
 title={'美味厨房'}
 payTime={'2019-03-06'}
 payTimeLast={'10:56'}
 src={'http://st.allpyra.com/data/static/op/fic/b-008.png'}
 payNum={'-200+50'}
 payNumDes={'豆'}
 */
import React, { Component } from "react";
import { StyleSheet, View, Text,Image } from "react-native";
import { windowWidth } from "../../../utils/style";
import DateUtil from "../../../pages/user/setUp/DateUtil";
type PropsType = {
  src?:string,
  style?: any,
  title?: string,
  payTime?: string,
  payTimeLast?: string,
  payNum?: string,
  payNumDes?: string,
};

export default class ConsumeRecordItem extends Component {
  props: PropsType;
  render() {
    const {style,data } =
    this.props || {};

    let createTime=DateUtil.formatDate(data.payTime, "yyyy-MM-dd hh:mm")
    let arr=createTime.split(' ');
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let currentTime= y + '-' + m + '-' + d;
    let timeStr='';
    if (arr[0]===currentTime){
      timeStr='今天'+' '+arr[1]
    }else {
      timeStr=arr[0]+' '+arr[1]
    }

    let saleNum=data.totalPrice-data.totalFee
    return (
      <View style={[styles.container, style]}>
        <View style={{flexDirection:'row',alignItems: "center", justifyContent: "space-between",paddingVertical: 20,}}>
          <View style={{flexDirection: 'row',alignItems: "center"}}>
            <View>
              <Image source={{uri:data.merchantHeadPic}} style={{width:45,height:45,marginLeft: 15,borderRadius:45/2,backgroundColor:'#D9D9D9'}}/>
            </View>
            <View style={{flexDirection: 'column',marginLeft:10}}>
              <Text style={{fontSize:15}}>{data.merchantName}</Text>
              <Text style={{fontSize:13,color:'#A7A7A7',marginTop: 5}}>{timeStr}</Text>
            </View>
          </View>
          <View style={{}}>
            <View style={{flexDirection: 'row',justifyContent: "space-between",alignItems: "center"}}>
              <Text style={{fontSize:18,color:'#333333'}}>{'-￥'+data.totalFee+'+'+data.jisuAmount}</Text>
              <Text style={{marginRight: 15,fontSize:13,color:'#333333'}}>豆</Text>
            </View>
            <Text style={{fontSize:12,color:'#333333',textAlign: 'center'}}>{'已优惠：'+saleNum}</Text>
          </View>
        </View>
        <View style={{backgroundColor:'#D9D9D9',width:windowWidth-30,height:0.5}}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    // alignItems: "center",
    // backgroundColor:'white',
    // justifyContent: "space-between",
    backgroundColor:'white',
    paddingHorizontal: 15,
  }
});
