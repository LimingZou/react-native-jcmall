import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,TextInput,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import ListItem from "../../../components/my/jusubean/listItem";
import ParsedText from "react-native-parsed-text";
import LFlatList from "../../../components/public/LFlatList";
import Button from "../../../components/category/Button";
const dataSource = require("../../../pages/discovery/recommended/data.json");
import AddBankItem from "../../../components/my/balance/addbankItem";
import { Toast } from "../../../utils/function";
import Verify from "../../../utils/verify";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {requestBanks} from "../../../redux/actions/my";
import GetBankCode from "../../../utils/getbankcode";
import {connect} from "react-redux";

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

export default class AddBankCard extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bankCode:"",
      name:"",
      bankCard:"",
      bankBranchName:"",
      cardId:"",
      mobile:""
    };
  }

  componentDidMount(){
  
  }

  async getBankCode(){
    const e = await Fetch.fetch({
      api: MyApi.addBank,
      params: {
        name: name,
        mobile: mobile,
        cardId: cardId,
        bankBranchName: bankBranchName,
        bankCard: bankCard,
        bankCode: bankCode,
      }
    });

  }

  getMyCouponList(name,mobile,cardId,bankBranchName,bankCard,bankCode){
    const {Banks,Amount} = this.props;   
    Fetch.fetch({
      api: MyApi.addBank,
      params: {
        name: name,
        mobile: mobile,
        cardId: cardId,
        bankBranchName: bankBranchName,
        bankCard: bankCard,
        bankCode: bankCode,
      }
    }).then((e)=>{
      if(e.code == "0000"){
        this.props.navigation.pop()
        this.props.dispatch(requestBanks());
      }
      Toast.info(e.message)
    })
  }

  async checkedBank(item) {
    this.setState({
      selectBankId: item.id
    })
    const e = await Fetch.fetch({
      api: MyApi.setDefalutCard,
      params: {
        id: item.id
      }
    });
  }

  onButtonClick = () => {
    this.setState({
      modalVisible: true
    });
  };

  submit(){
    const {name,mobile,cardId,bankBranchName,bankCard,bankCode} = this.state
    if(name.length<1){
      return Toast.warn("请输入姓名");
    }
    if(!Verify.formatBankNo(bankCard)){
      return Toast.warn("请输入正确的银行卡号");
    }
    if(bankBranchName.length<1){
      return Toast.warn("请输入开户行");
    }
    if(!Verify.IdentityCodeValid(cardId)){
      return Toast.warn("请输入正确的身份证号");
    }

    if(!Verify.verifyPhone(mobile)){
      return Toast.warn("请输入正确的手机号");
    }
    this.getMyCouponList(name,mobile,cardId,bankBranchName,bankCard,bankCode);
  }

  onBlur(){
    const {bankCard} = this.state
    let  code = GetBankCode.bankCardAttribution(bankCard)
    if(code&&code.bankCode){
      this.setState({
        bankCode: code.bankCode
      })
    }
  }

  render() {

    const {name,mobile,cardId,bankBranchName,bankCard,bankCode} = this.state
    
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <AddBankItem
          style={{ marginTop: 10 }}
          title="持卡人"
          keyboardType="default"
          placeholder="请输入持卡人姓名"
          onChangeText={(text)=>{
            this.setState({name:text})
          }}
        />
        <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
        <AddBankItem
          title="卡号"
          keyboardType="default"
          placeholder="请输入银行卡卡号"
          onBlur={this.onBlur.bind(this)}
          onChangeText={(text)=>{
            this.setState({bankCard:text})
          }}
        />
        <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
        <AddBankItem
          title="开户行"
          keyboardType="default"
          placeholder="请输入开户行"
          onChangeText={(text)=>{
            this.setState({bankBranchName:text})
          }}
        />
        <AddBankItem
          style={{ marginTop: 10 }}
          title="身份证号"
          keyboardType="default"
          placeholder="请输入持卡人身份证号码"
          onChangeText={(text)=>{
            this.setState({cardId:text})
          }}
        />
        <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
        <AddBankItem
          title="预留手机号"
          keyboardType="numeric"
          placeholder="请输入持卡人开户时预留的手机号"
          onChangeText={(text)=>{
            this.setState({mobile:text})
          }}
        />
        <View style={{marginTop:100}}>
          <Button
            colors={["#FE7E69", "#FD3D42"]}
            title="提交"
            linearGradientStyle={styles.button}
            titleStyle={styles.buttonStyle}
            onPress={this.submit.bind(this)}
          />
        </View>

        </KeyboardAwareScrollView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"添加银行卡"}
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
    alignItems:'center'
  },
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  leftTitle: {
    width: windowWidth / 3,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginLeft: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10
  }
});
