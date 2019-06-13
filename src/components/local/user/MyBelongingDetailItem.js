/**
 //商家后台-我的资产明细item
 */
import React, { Component } from "react";
import { StyleSheet, View, Text,Image,TouchableOpacity,ImageBackground } from "react-native";
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

export default class MyBelongingDetailItem extends Component {
  props: PropsType;
  render() {
    const {style,data,onPress } =
    this.props || {};
    let createTime=DateUtil.formatDate(data.createTime, "yyyy-MM-dd hh:mm")
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
    return (
      <TouchableOpacity style={[styles.container, style]}
                        onPress={onPress}
      >
        <View style={{flexDirection:'row',alignItems: "center", justifyContent: "space-between",paddingVertical: 20,}}>
          <View style={{flexDirection: 'row',alignItems: "center"}}>
            <View>
              <ImageBackground source={{uri:data.headUrl}} style={{width:45,height:45,marginLeft: 15,borderRadius:45/2,backgroundColor:'#D9D9D9'}}/>
            </View>
            <View style={{flexDirection: 'column',marginLeft:10}}>
              <Text style={{fontSize:15}}>{data.nickName}</Text>
              <Text style={{fontSize:15,color:'#2C2C2C',marginTop: 5}}>{data.recordType}</Text>
            </View>
          </View>
          <View style={{}}>
            <Text style={{fontSize:13,color:'#A7A7A7'}}>{timeStr}</Text>
            <Text style={{fontSize:18,color:data.recordType==='提现'?'#46AB36':'#E0324A',textAlign: 'right',marginTop:5}}>{data.inOrOut+data.recordResult}</Text>
          </View>
        </View>
        <View style={{backgroundColor:'#D9D9D9',width:windowWidth-30,height:0.5}}>
        </View>
      </TouchableOpacity>
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
