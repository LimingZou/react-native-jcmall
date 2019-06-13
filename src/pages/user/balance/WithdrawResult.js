import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import FlatList from "../../../components/public/LFlatList";

import { MyApi } from "../../../services/api/my";
import Fetch from "../../../utils/fetch";
import DatePicker from "../../../components/@jcmall/datepick/datepicker";
import Button from "../../../components/category/Button";
import DetailItme from "../../../components/my/jusubean/detailItem";
import Time from "../../../utils/time";
import { formatMoney } from "../../../utils/function";

export default class WithdrawResult extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
   
  }

  render() {
    const {selectDate,dataSource,monthUnpaidAmount,empty,currentPage} = this.state
    return (
      <View
        style={[styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}>
        <View style={{flexDirection:'row'}}>
            <View style={{marginTop:56,alignItems:'center',marginLeft:47}}>
                <View style={{height:10,width:10,backgroundColor:"#FD3F43",borderRadius:5}}/>
                <View style={{height:87,width:2,backgroundColor:"#FD3F43"}}/>
                <View style={{height:30,width:30,backgroundColor:"#0EADFE",borderRadius:15}}/>
                <View style={{height:87,width:2,backgroundColor:"#E5E5E5"}}/>
                <View style={{height:10,width:10,backgroundColor:"#E5E5E5",borderRadius:5}}/>
            </View>
            <View style={{marginTop:56,alignItems:'center',marginLeft:10,justifyContent:'space-between'}}>
                <Text style={{color:'#999999',fontSize:15}}>
                    发起提现申请
                </Text>
                <Text style={{color:'#333333',fontSize:18}}>
                    发起提现申请
                </Text>
                <Text style={{color:'#999999',fontSize:15}}>
                    到账成功
                </Text>
            </View>
        </View>
        <View style={{width:windowWidth-44,height:0.5,backgroundColor:'#D9D9D9',marginLeft:22,marginTop:30}}/>
        <View style={{flexDirection:'row',marginHorizontal:22,justifyContent:'space-between',marginTop:30}}>
            <Text style={{color:'#999999',fontSize:15}}>
                提现金额
            </Text>
            <Text style={{color:'#333333',fontSize:15}}>
                ¥800.00
            </Text>
        </View>
        <View style={{flexDirection:'row',marginHorizontal:22,justifyContent:'space-between',marginTop:30}}>
            <Text style={{color:'#999999',fontSize:15}}>
                手续费
            </Text>
            <Text style={{color:'#333333',fontSize:15}}>
                ¥800.00
            </Text>
        </View>
        <View style={{flexDirection:'row',marginHorizontal:22,justifyContent:'space-between',marginTop:30}}>
            <Text style={{color:'#999999',fontSize:15}}>
                到账银行卡
            </Text>
            <Text style={{color:'#333333',fontSize:15}}>
                ¥800.00
            </Text>
        </View>
        <View style={{alignItems:'center',marginTop:78}}>
            <View style={styles.bottomButton}>
                <Text style={{color:"#FD3F43",fontSize:15}}>
                    完成
                </Text>
            </View>
        </View>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"提现受理"}
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
        />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bottomButton:{
    height:40,width:160,borderColor:'#FD3F43',borderWidth:1,borderRadius:3,alignItems:'center',justifyContent:'center'
  }
});
