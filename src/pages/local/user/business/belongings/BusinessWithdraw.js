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
  LayoutAnimation, Modal
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import { PublicStyles, windowHeight, windowWidth } from "../../../../../utils/style";
import Button from "../../../../../components/local/common/Button";
import WithDrawItem from "../../../../../components/my/balance/withdrawItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import fa from "../../../../../utils/fa";
import { Toast } from "../../../../../utils/function";
import GetBankCode from "../../../../../utils/getbankcode";
import Icon from "../../../../../config/iconFont";
const isEmptyObject = (obj) => {
  for (let id in obj) {
    return false;
  }
  return true;
}
export default class BusinessWithdraw extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let balanceAmt=this.props.navigation.state.params.balanceAmt;
    // let defaultBankData=this.props.navigation.state.params.defaultBankData;
    this.state = {
      bankNum:'',
      bankTypeName:'',
      bankName:'',
      balanceAmt:balanceAmt,
      // defaultBankData:defaultBankData,
      useBalance:0,
      modalVisible: false,
      payPwd:'',
      selecBank:{

      },
      isEmptyBankCard:true,
      defaultBankData:'',
    };
  }

  componentDidMount() {
    // this.personQueryMyBankList()
    this.personGetDefaultCard()
  }

  //获取默认银行卡
  personGetDefaultCard = async () => {
    const params = {
    };
    console.log('获取默认银行卡参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personGetDefaultCard,
      params
    });
    console.log('获取默认银行卡结果',e);
    fa.toast.show({
      title: "加载中...",
      type:"loading"
    });
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      if(isEmptyObject(e.obj)){
      }else {
        this.setState({
          isEmptyBankCard:false,
          defaultBankData:e.obj,
        })
        this.onBlur(e.obj.bankCard)
      }

    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  // defaultBank(bankData){
  //   let BankItem = {}
  //   if(bankData&&bankData.list){
  //     bankData = bankData.list
  //   }else{
  //     return  BankItem
  //   }
  //   for (let index = 0; index < bankData.length; index++) {
  //     const element = bankData[index];
  //     if(element.isDefaultBankCard == 1){
  //       return BankItem = bankData[index]
  //     }
  //   }
  //   if(BankItem){
  //     return BankItem = bankData[0]
  //   }
  // }

  //佣金提现
  _cashUserAccount = async () => {
    let arr=this.state.useBalance.split('.')
    // let str=arr[0]+arr[1]
    console.log(arr[0]+arr[1])
    const params = {
      money:arr[0]+arr[1],
      // payPassword:this.state.payPwd,
      userBankId:this.state.defaultBankData.id,
    };
    console.log('提现参数',params);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.merchantWithdrawCash,
      params
    });
    console.log('提现结果',e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      Toast.success(e.message)

    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  _sureCashButtonClick(){
    // this.setModalVisible(false);
    if(this.state.payPwd===''){
      Toast.warn('请输入支付密码')
    }else {
      //请求接口
      this._cashUserAccount()
    }

  }
  onBlur=(bankCard) =>{
    let  bankLength = bankCard.length
    let  bankNum = bankCard.substring(bankLength-4,bankLength)
    let  code = GetBankCode.bankCardAttribution(bankCard)
    let cardTypeMap = {
      DC: "储蓄卡",
      CC: "信用卡",
      SCC: "准贷记卡",
      PC: "预付费卡"
    };
    this.setState({
      bankNum:bankNum,
      bankTypeName:cardTypeMap[code.cardType],
      bankName:code.bankName,
    })
  }
  render() {
    const { balanceAmt } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            {this.state.isEmptyBankCard===true?
              <TouchableOpacity style={{width:windowWidth-30,marginTop:15,marginLeft:15,height:100,backgroundColor:'white',borderRadius:5,borderColor:'#D9D9D9',borderWidth:1}}
                                onPress={()=>{this.props.navigation.navigate("BusinessAddBank",{
                                  callback:(()=>{
                                    this.personGetDefaultCard()
                                  })
                                })}}
              >
                <Text style={{color:'#333333',fontSize:15,width:110,marginLeft:(windowWidth-30-110)/2,height:16,marginTop:42}}>+请添加银行卡</Text>
                <Icon name={"-arrow-right"} size={20} color={'#D9D9D9'} style={{position: 'absolute',right:15,top:40}}/>
              </TouchableOpacity>
              :
              <WithDrawItem
                colors={['#53ACFF','#2772F0']}
                bankName={this.state.bankName}
                bankNum={'尾号 '+this.state.bankNum+' '+this.state.bankTypeName}
                bankIcon={
                  <Image
                    style={{ height: 45, width: 48 }}
                    resizeMode="contain"
                    source={require("../../../../../images/mine/jsyh.png")}
                  />
                }
                backColor="white"
                onPress={() => {
                  this.props.navigation.navigate("BusinessBankManage", {
                    callback:((item)=>{
                      if (isEmptyObject(item)){
                        this.setState({
                          isEmptyBankCard:true,
                          defaultBankData:[],
                        })
                      } else {
                        this.onBlur(item.bankCard)
                      }
                    })
                  });
                }}
              />
            }

            <View style={styles.topView}>
              <Text style={{ color: "#000", fontSize: 30 }}>￥</Text>
              <TextInput
                ref={textInput1 => {
                  this.textInput1 = textInput1;
                }}
                keyboardType="numeric"
                placeholder={"可提现余额"+this.state.balanceAmt+'元'}
                placeholderTextColor="#D9D9D9"
                underlineColorAndroid="transparent"
                secureTextEntry={false}
                onChangeText={(text)=>{
                  this.setState({
                    useBalance:text
                  })
                }}
                onEndEditing={() => {
                  let textNum=parseInt(this.state.useBalance).toFixed(2)
                  this.setState({
                    useBalance:textNum
                  })
                }}
                value={this.state.useBalance}
                style={{
                  height: 30,
                  flex: 1,
                  backgroundColor: "#fff",
                  marginLeft: 10
                }}
              />
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 60,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    useBalance: balanceAmt
                  });
                }}
              >
                <Text style={{ color: "#333333", fontSize: 13 }}>全部</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                width: windowWidth - 60,
                marginLeft: 30,
                backgroundColor: "#D9D9D9",
                marginTop: 10
              }}
            />
            <View
              style={{ width: windowWidth - 60, marginLeft: 30, marginTop: 10 }}
            >
              <Text style={{ color: "#333333", fontSize: 10 }}>
                (每笔收取0.8元，预计3个工作日内到账，如有问题请联系平台，每日限额
                100-500000元）
              </Text>
            </View>
          </View>
          <Button
            colors={["#FE7E69", "#FD3D42"]}
            title="提现"
            linearGradientStyle={styles.sureButton}
            titleStyle={styles.sureButtonFont}
            onPress={() => {
              if(this.state.isEmptyBankCard===true){
                Toast.warn('请先添加银行卡')
              } else if(this.state.useBalance===''){
                Toast.warn('请输入提现金额')
              }else if(parseFloat(this.state.useBalance)<100.00||parseFloat(this.state.useBalance)>500000.00){
                Toast.warn('您输入的金额不在可提现范围内')
              }else {
                this.setState({
                  modalVisible: true
                });
              }
            }}
          />
          <TouchableOpacity style={{marginTop:20}}
                            onPress={()=>{this.props.navigation.navigate("MyWithdrawRecord")}}
          >
            <Text style={{ color: "#2886FF", fontSize: 17,textDecorationLine: 'underline',textAlign:'center' }}>
              提现记录
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <KeyboardAwareScrollView>
              <TouchableOpacity
                style={{
                  width: windowWidth,
                  height: windowHeight,
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.7)"
                }}
                activeOpacity={1}
                onPress={()=>{this.setState({modalVisible:false})}}
              >
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                  <TextInput
                    keyboardType="default"
                    placeholder="请输入6位数字安全密码"
                    keyboardType="numeric"
                    maxLength={6}
                    placeholderTextColor="#7F7F7F"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                      this.setState({
                        payPwd:text
                      })
                    }}
                    value={this.state.payPwd}
                    style={{
                      height: 26,
                      width: windowWidth - 90,
                      backgroundColor: "#fff",
                      textAlign:'center',
                      marginTop: 57
                    }}
                  />
                  <View
                    style={{
                      height: 1,
                      width: windowWidth - 60,
                      marginLeft: 15,
                      backgroundColor: "#D9D9D9"
                    }}
                  />
                  <Button
                    colors={["#FE7E69", "#FD3D42"]}
                    title="确定"
                    linearGradientStyle={styles.surePayButton}
                    titleStyle={styles.sureButtonFont}
                    onPress={() => {
                      this._sureCashButtonClick()
                    }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </Modal>
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
  surePayButton: {
    height: 44,
    width: windowWidth - 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 15
  },
  modalView: {
    height: 175,
    width: windowWidth - 30,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 6,
    marginTop:183+NavigationBar.Theme.contentHeight
  },
});
