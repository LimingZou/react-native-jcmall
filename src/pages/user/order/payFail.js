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

import NavigationBar from "../../../components/@jcmall/navbar";
import LinearGradient from "react-native-linear-gradient";
import Icon from "../../../config/iconFont";
import Button from "../../../components/category/Button";
import { StackActions ,NavigationActions} from "react-navigation";
import NavigationService from "../../../containers/navigationService";

export default class PayFail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)
        this.state={
          
        }
    }

    render() {
        const { navigation, isWXAppInstalled, dispatch } = this.props;
        const { mode, nationalCode, nationalName } = this.state;
        return (
        <View style={[ PublicStyles.ViewOut]}>
            <View style={{backgroundColor: "#fff",
                    width: windowWidth,
                    height: windowHeight}}>
            <LinearGradient
                style={[
                styles.logoView,
                {paddingTop: 100}
                ]}
                colors={["#fcc55b", "#fe6c00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.5]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name={"-close-outline"} size={21} color={"#FFFFFF"} />
                    <Text style={{color:'#FFFFFF',fontSize:18,marginLeft: 10}}>支付失败</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:32,marginBottom:25}}>
                    <Text style={{color:'#fff',marginHorizontal:60}}>
                        抱歉您的订单支付失败，订单将关闭，如需购买请重新下单。
                    </Text>
                </View>
            </LinearGradient>
            <View style={{height:100,width:windowWidth,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:32,marginBottom:25}}>
                    <TouchableOpacity onPress={()=>{
                      this.props.navigation.navigate('Index')
                    }} style={{opacity:1,width:85,height:30,borderRadius:15,borderWidth:1,borderColor: '#FD3D42',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#FD4044',fontSize:12}}>返回首页</Text>
                    </TouchableOpacity>
                    <Button
                        colors={["#FDC367", "#FC8646"]}
                        title="查看订单"
                        linearGradientStyle={{width:100,height:35,borderRadius:18,borderWidth:1,borderColor: '#FFFFFF',alignItems:'center',justifyContent:'center',marginLeft:35}}
                        titleStyle={{color:'#FFFFFF',fontSize:12}}
                        onPress={()=>{
                          this.props.navigation.navigate('OrderList', {})
                        }}
                    />
                </View>
            </View>
            </View>
            <NavigationBar
              leftView={
                <NavigationBar.BackButton tintColor={'white'} onPress={() => navigation.pop()}/>
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
