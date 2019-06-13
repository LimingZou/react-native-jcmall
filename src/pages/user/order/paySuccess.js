/**
 * 支付成功
 */
import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  PublicStyles,
  ThemeStyle,
  windowWidth,
  windowHeight
} from "../../../utils/style";
import {StackActions,NavigationActions} from 'react-navigation'

import NavigationBar from "../../../components/@jcmall/navbar";
import LinearGradient from "react-native-linear-gradient";
import Icon from "../../../config/iconFont";
import NavigationService from "../../../containers/navigationService";
import Fetch from "../../../utils/fetch";
import {OrderApi} from '../../../services/api/order';
import Time from "../../../utils/time";

export default class PaySuccess extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)
        this.state={
          paySn:"",
          payTime:"",
          payType:"微信支付"
        }
    }

    componentDidMount(){
        let orderId = ""
        if(this.props.navigation.state.params&&this.props.navigation.state.params.orderId){
            orderId = this.props.navigation.state.params.orderId
            Fetch.fetch({
              api: OrderApi.queryAndupdateOrderStatus,
              params: {
                id:orderId
              }
            }).then((e)=>{
              if(e&&e.obj.paySn){
                this.setState({
                  paySn: e.obj.paySn,
                  payTime: e.obj.payTime
                })
              }
            }) 
        }else{
          this.setState({
            payTime: new Date().getTime(),
            payType: "全豆支付"
          })
        }
        
    }

    render() {
      const { navigation, isWXAppInstalled, dispatch } = this.props;
      const { mode, nationalCode, nationalName ,paySn,payTime,payType} = this.state;
        return (
        <View
            style={[
              PublicStyles.ViewOut,
              { paddingTop: 120 }
            ]}
        >
            <View
            style={{
                backgroundColor: "#fff",
                position: "absolute",
                width: windowWidth,
                height: windowHeight
            }}
            >
            <LinearGradient
                style={[
                styles.logoView,
                { paddingTop: 100 }
                ]}
                colors={["#fcc55b", "#fe6c00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.5]}
            >
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={"-checked-outline"} size={21} color={"#FFFFFF"} />
                <Text style={{color:'#FFFFFF',fontSize:18,marginLeft: 10}}>支付成功</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:32,marginBottom:25}}>
                  <TouchableOpacity onPress={()=>{
                    // NavigationService.popToTop()
                    this.props.navigation.navigate('Index')
                  }} style={{opacity:1,width:85,height:30,borderRadius:15,borderWidth:1,borderColor: '#FFFFFF',alignItems:'center',justifyContent:'center'}}>
                      <Text style={{color:'#FFFFFF',fontSize:12}}>返回首页</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                        const resetAction = StackActions.reset({
                          index: 1,
                          actions: [
                            NavigationActions.navigate({ routeName: 'Index' }), 
                            NavigationActions.navigate({ routeName: 'OrderList'})
                          ]
                        })
                        this.props.navigation.dispatch(resetAction)
                        // this.props.navigation.navigate('OrderList', {})
                      }}
                      style={{opacity:1,width:85,height:30,borderRadius:15,borderWidth:1,borderColor: '#FFFFFF',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                      <Text style={{color:'#FFFFFF',fontSize:12}}>查看订单</Text>
                  </TouchableOpacity>
                </View>
            </LinearGradient>
            </View>
            <View
            style={{
                opacity: 1,
                marginHorizontal: 25,
                paddingHorizontal: 25,
                paddingVertical:35,
                backgroundColor: "#fff",
                borderRadius: 5,
                shadowColor: "rgba(253, 69, 71, 0.2)",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 1,
                shadowRadius: 19,
                cornerRadius: 5,
                marginTop:100
            }}>
                <View style={{fontFamily: "PingFangSC-Regular",flexDirection: "column",}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'#D9D9D9',borderBottomWidth:0.5}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <Text style={{ color:'#333333', fontSize: 15}}>支付编号</Text>
                        </View>
                        <View style={{width:140,height:30,alignItems:'flex-end',justifyContent:'center',marginLeft:35,marginBottom:20}}>
                            <Text style={{color:'#FE662A',fontSize:12}}>
                              {paySn}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'#D9D9D9',borderBottomWidth:0.5,marginTop:20}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <Text style={{ color:'#333333', fontSize: 15}}>支付方式</Text>
                        </View>
                        <View style={{width:100,height:30,alignItems:'flex-end',justifyContent:'center',marginLeft:35,marginBottom:20}}>
                            <Text style={{color:'#FE662A',fontSize:12}}>{payType}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <Text style={{ color:'#333333', fontSize: 15}}>支付时间</Text>
                        </View>
                        <View style={{width:140,height:30,alignItems:'flex-end',justifyContent:'center',marginLeft:35}}>
                            <Text style={{color:'#FE662A',fontSize:12}}>
                              {Time.formatStringDate(payTime,'YYYY.MM.DD')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <NavigationBar
                leftView={
                    <NavigationBar.BackButton tintColor={'white'} onPress={() => navigation.pop()} />
                }
                title={""}
                style={{ backgroundColor: "rgba(1, 1, 1, 0)", borderBottomWidth: 0 }}
                titleStyle={{ color: "black" }}
                statusBarStyle={"light-content"}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  textInput1: {
    flex: 1,
    padding: 0,
    fontSize: 16,
    color: "#333",
    height: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea"
  },
  view2: {
    justifyContent: "center",
    marginTop: 40
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30
  },
  text3: {
    fontSize: 14,
    color: "#aeb3b9"
  },
  logoView: {
    alignItems: "center",
    width: windowWidth,
    height: 240
  },
  logo: {
    width: 185,
    height: 59
  },
  criclecss: {
    width: 60,
    height: 60,
    backgroundColor: "#F4F4F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    height: 44,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#FF7541",
    borderWidth: 0
  },
  logintext: {
    color: "#fff"
  },
  View4: {
    alignItems: "center",
    marginTop: 20
  },
  weiViewcss: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    paddingTop: 2,
    paddingLeft: 2,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 9
  },
  View5: {
    flexDirection: "row",
    marginVertical: 10
  },
  text4: {
    color: "#333333",
    fontSize: 13,
    fontFamily: "PingFangSC-Regular"
  },
  text5: {
    color: "#aeb3b9",
    fontSize: 12,
    fontFamily: "PingFangSC-Medium"
  },
  text6: {
    color: "#333333",
    fontSize: 15,
    fontFamily: "PingFangSC-Regular"
  }
});
