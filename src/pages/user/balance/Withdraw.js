import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Button from "../../../components/category/Button";
import WithDrawItem from "../../../components/my/balance/withdrawItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {requestBanks} from "../../../redux/actions/my";
import InputPassword from "../../../components/my/balance/inputpassword";
import {connect} from "react-redux";
import { Toast } from "antd-mobile-rn";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { requestAmount } from "../../../redux/actions/my";
let key = null;
import Overlay from "../../../components/@jcmall/overlay";

@connect(({
  view: {
    my: {
      Banks,
      BanksFetchStatus,
      Amount
    }
  }
}) => ({
  Banks,
  fetchStatus: BanksFetchStatus,
  Amount
}))

@connect(({ app: { user: { userInfo } } }) => ({
  userInfo
}))

export default class WithDraw extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selecBank:{},
      withdrawNum:"",
      modalVisible:false,
      payPassword:"",
      bankId:""
    };
    this.bankId = null
  }

  componentDidMount() {
    this.props.dispatch(requestBanks());
  }

  defaultBank(bankData){
    let BankItem = null
    if(bankData&&bankData.list&&bankData.list.length>0){
        let  banks = bankData.list
        banks.forEach((element,index) => {
          if(element.isDefaultBankCard == 1){
            BankItem=banks[index]
          }
        });
    }
    return BankItem
  }
  
  async withDraw(){
    let nickName = ""
    const {withdrawNum,payPassword} = this.state
    const {userInfo} = this.props
    if(userInfo&&userInfo.nickName){
      nickName = userInfo.nickName
    }

    if(payPassword.length<1){
      return Toast.show("请输入密码")
    }

    if(!this.bankId){
      return Toast.show("请添加银行卡")
    }

    const e = await Fetch.fetch({
      api: MyApi.withDraw,
      params: {
        qty:withdrawNum,
        transferUserName:nickName,
        payPassword:payPassword,
        bankId:this.bankId
      }
    });
    Overlay.hide(key)
    Toast.info(e.message)
    this.props.dispatch(requestAmount());
  }

  withDrawPress(){
    const {withdrawNum} = this.state
    if(withdrawNum.length<1){
      return Toast.show("请输入转账金额")
    }
    this._showOverlay()
  }

  _showOverlay() {
    key = Overlay.show(
      <InputPassword
        passwordContent={(text)=>{
          this.setState({
            payPassword:text
          })
        }}
        closeModal={()=>Overlay.hide(key)}
        surePressButton={() => {
          this.withDraw()
        }}
      />
    )
  }

  render() {
    const {Banks,Amount} = this.props;
    const {withdrawNum,modalVisible} = this.state
    let userBalanceAmount = 0
      if(Amount&&Amount.userBalanceAmount){
        userBalanceAmount = Amount.userBalanceAmount 
      }
    let defaultBank = this.defaultBank(Banks);
    if(defaultBank){
      this.bankId = defaultBank.id
    }

    let bankLength = 0
        if(defaultBank&&defaultBank.bankCard){
            bankLength = defaultBank.bankCard.length
        }
    let bankNum = ""
        if(defaultBank&&defaultBank.bankCard){
            bankNum = defaultBank.bankCard.substring(bankLength-4,bankLength)
        }
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            {defaultBank?
                <WithDrawItem
                    colors={['#53ACFF','#2772F0']}
                    bankName={defaultBank&&defaultBank.bankName?defaultBank.bankName:""}
                    bankNum={`尾号${bankNum}储蓄卡`}
                    bankIcon={
                      <Image
                        style={{ height: 45, width: 48 }}
                        resizeMode="contain"
                        source={require("../../../images/mine/jsyh.png")}
                      />
                    }
                    backColor="#841013"
                    onPress={() => {
                      this.props.navigation.navigate("BankCardManage", {});
                    }}/>:
                <TouchableOpacity style={[styles.showRealName,{marginTop:10}]}
                    onPress={() => {
                      this.props.navigation.navigate("BankCardManage", {});
                    }}>
                    <Text style={{ color: "#FD3E42", fontSize: 15, marginLeft: 10 }}>
                      新增银行卡
                    </Text>
                </TouchableOpacity>
            }
            <View style={styles.topView}>
              <Text style={{ color: "#000", fontSize: 30 }}>￥</Text>
              <TextInput
                keyboardType="numeric"
                placeholder={`可提现余额${userBalanceAmount}元`}
                placeholderTextColor="#D9D9D9"
                underlineColorAndroid="transparent"
                value={`${withdrawNum}`}
                onChangeText={(text)=>{
                  this.setState({
                    withdrawNum: text
                  })
                }}
                style={{height: 30,flex: 1,backgroundColor: "#fff",marginLeft: 10,padding: 0}}
              />
              <TouchableOpacity style={styles.inputView}
                onPress={() => {
                  this.setState({
                    withdrawNum: userBalanceAmount + ""
                  })
                }}>
                <Text style={{ color: "#333333", fontSize: 13 }}>全部</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hintView}/>
            <View style={{ width: windowWidth - 60, marginLeft: 30, marginTop: 10 }}>
              <Text style={{ color: "#333333", fontSize: 10 }}>
                (收取3%手续费，预计3个工作日内到账，如有问题请联系平台，每日限额 500-500000元）
              </Text>
            </View>
          </View>
          
          <Button
            colors={["#FE7E69", "#FD3D42"]}
            title="提现"
            linearGradientStyle={styles.sureButton}
            titleStyle={styles.sureButtonFont}
            onPress={() => {
              this.withDrawPress()
            }}
          />

          <TouchableOpacity style={{width:windowWidth,flexDirection:'row',justifyContent:'center',marginTop:20}}
            onPress={()=>{
              // this.props.navigation.navigate("WithdrawResult")
              this.props.navigation.navigate("WithdrawList")
            }}>
            <Text style={{color:'#2886FF',fontSize:15}}>
              提现记录
            </Text>
          </TouchableOpacity>
        
        </KeyboardAwareScrollView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"余额提现"}
          titleStyle={{ fontSize: 18, color: "#333333" }}
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
    backgroundColor: "#f2f2f2"
  },
  content: {
    height: 242,
    width: windowWidth,
    backgroundColor: "#fff"
  },
  topView: {
    flexDirection: "row",
    height: 30,
    width: windowWidth - 60,
    marginTop: 20,
    marginLeft: 30
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 15
  },
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },
  showRealName:{
    height: 48,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor:'#f2f2f2'
  },
  inputView:{
    height: 30,
    width: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  hintView:{
    height: 1,
    width: windowWidth - 60,
    marginLeft: 30,
    backgroundColor: "#D9D9D9",
    marginTop: 10
  }
});
