/**
 * 评论成功
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

export default class EvaluateSuccess extends Component {
  static defaultProps = {
  };

  static navigationOptions = {
    header: null
  };


  state = {
  };

  render() {
    const { navigation, isWXAppInstalled, dispatch } = this.props;
    const { mode, nationalCode, nationalName } = this.state;
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
              <Text style={{color:'#FFFFFF',fontSize:18,marginLeft: 10}}>评价成功</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:32,marginBottom:25}}>
              <TouchableOpacity onPress={()=>{alert('返回首页')}} style={{opacity:1,width:85,height:30,borderRadius:15,borderWidth:1,borderColor: '#FFFFFF',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#FFFFFF',fontSize:12}}>返回首页</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EvaluateOfMine', {})}} style={{opacity:1,width:85,height:30,borderRadius:15,borderWidth:1,borderColor: '#FFFFFF',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                <Text style={{color:'#FFFFFF',fontSize:12}}>查看评论</Text>
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
          }}
        >
          <View
            style={{
              fontFamily: "PingFangSC-Regular",
              flexDirection: "column",
              // alignItems: "flex-start",
            }}
          >
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={"-checked-outline"} size={21} color={"#aeb3b9"} />
                <Text style={{ color:'#333333', fontSize: 15,marginLeft:13 }}>领取优惠券</Text>
              </View>
              <TouchableOpacity onPress={()=>{alert('领取优惠券')}} style={{opacity:1,width:80,height:30,borderRadius:15,borderWidth:1,borderColor: '#FE662A',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                <Text style={{color:'#FE662A',fontSize:12}}>领取福利</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:30}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={"-checked-outline"} size={21} color={"#aeb3b9"} />
                <Text style={{ color:'#333333', fontSize: 15,marginLeft:13 }}>领取集速豆</Text>
              </View>
              <TouchableOpacity onPress={()=>{alert('领取集速豆')}} style={{opacity:1,width:80,height:30,borderRadius:15,borderWidth:1,borderColor: '#FE662A',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                <Text style={{color:'#FE662A',fontSize:12}}>领取福利</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:30}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={"-checked-outline"} size={21} color={"#aeb3b9"} />
                <Text style={{ color:'#333333', fontSize: 15,marginLeft:13 }}>升级会员等级</Text>
              </View>
              <TouchableOpacity onPress={()=>{alert('升级会员等级')}} style={{opacity:1,width:80,height:30,borderRadius:15,borderWidth:1,borderColor: '#FE662A',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                <Text style={{color:'#FE662A',fontSize:12}}>领取福利</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <NavigationBar
          leftView={
            <NavigationBar.BackButton tintColor={'white'} onPress={() => navigation.pop()} />
          }
          title={""}
          rightView={
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                paddingTop: 2,
                paddingLeft: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                this.nationalCodeListDialog.show();
              }}
            >
              <Icon name={"-kefu"} size={23} color={"#fff"} />
            </TouchableOpacity>
          }
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
