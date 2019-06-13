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
import FlatList from "../../../components/flatList";
import VerifyItem from "../../../components/my/others/verifyItem";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import Button from "../../../components/category/Button";
import { Toast } from "antd-mobile-rn";
import { connect } from "react-redux";
@connect(({ app: { user: {userInfo } } }) => ({
  userInfo
}))

export default class IdentityVerify extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      realNameList:[]

    };
  }

  componentDidMount(){
    this.getRealNameList()
  }

  getRealNameList(){
    Fetch.fetch({
      api: MyApi.realNameList,
      params: {}
    }).then((result)=>{
      if(result&&result.obj){
        this.setState({
          realNameList:result.obj
        })
      }
      console.log(result)
      console.log("---result----真实姓名--")
    })
  }

  
  delectRealName(idCard){
    Fetch.fetch({
      api: MyApi.delectRealName,
      params: {
        id:idCard
      }
    }).then((result)=>{
      if(result.code == "0000"){
        this.getRealNameList()
        if(this.props.navigation.state.params.realNameCallBack){
          this.props.navigation.state.params.realNameCallBack()
        }
        Toast.success(result.message)
      }else{
        Toast.success(result.message)
      }
      console.log(result)
      console.log("---result----删除真实姓名--")
    })

  }

  setDefaultRealName(element){
    const {userInfo} = this.props
    Fetch.fetch({
      api: MyApi.addRealName,
      params: {
        id:element.id,
        realName:element.realName,
        idCard:element.idCard,
        userId:userInfo.id
      }
    }).then((result)=>{
      console.log(result)
      console.log("---result----设置默认真实姓名--")
      if(this.props.navigation.state.params&&this.props.navigation.state.params.realNameCallBack){
        this.props.navigation.state.params.realNameCallBack()
      }
      Toast.info(result.message)
      this.props.navigation.pop()
    })
  }

  realNameListView(){
    const {realNameList} = this.state
    let  realNameArray = []
        realNameList.forEach((element,index)=>{
          realNameArray.push(
            <VerifyItem
              key={index}
              name={element.realName?element.realName:""}
              idCardNum={element.idCard ? element.idCard : ""}
              defaultSelect={element.isDefault ? element.isDefault : 0 }
              deleteRealName={()=>{this.delectRealName(element.id)}}
              setDefaultRealName={()=>{this.setDefaultRealName(element)}}
            />
          )
        })
      return realNameArray
  }

  render() {
    const barItems = this.barItems;
    const { dataSource } = this.state;
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
          <ScrollView style={{flex:1}}>
            {this.realNameListView()}
            <Button
                colors={["#FE7E69", "#FD3D42"]}
                title="新增实名认证"
                linearGradientStyle={styles.button}
                titleStyle={styles.buttonStyle}
                onPress={() => {
                  this.props.navigation.navigate("AddVerify", {
                    addRealNameCallback: (() => {
                      this.getRealNameList()
                      if(this.props.navigation.state.params&&this.props.navigation.state.params.realNameCallBack){
                        this.props.navigation.state.params.realNameCallBack()
                      }
                    })
                  })
                }}
              />
          </ScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"身份认证"}
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
    backgroundColor: "#f2f2f2",
    // alignItems: "center"
  },
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
    marginLeft: 15,
    marginRight: 15,
    bottom: 15,
    marginTop:50
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  }
});
